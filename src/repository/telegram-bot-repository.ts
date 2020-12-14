import TelegramBot from 'node-telegram-bot-api';
import rocketManager from '../manager/rocket.manager';
import FirebaseDatabaseRepository from './firebase-realtime-db.repository';
import { dataImage } from '../data/image-data';

class TelegramBotRepository {
  constructor() {}

  public initializaBot() {
    const bot = new TelegramBot(process.env.TELEGRAM_TOKEN as string, { polling: true });

    bot.onText(/^\/start/, async msg => {
      var chatId = msg.chat.id;
      bot.sendMessage(chatId, 'Hello!!!, We gonna start a little game to know when the rocket has been launched!🚀');
      const imageData = await rocketManager.getRocketImage();
      FirebaseDatabaseRepository.set('chats', chatId.toString(), imageData);
      await bot.sendPhoto(chatId, imageData.urlImage);
      bot.sendMessage(chatId, 'Has the rocket been launched? yes or no');
    });

    bot.on('message', async msg => {
      const chatId = msg.chat.id;
      if (msg.text === '/start') return;
      if (msg.text !== 'yes' && msg.text !== 'no') {
        return bot.sendMessage(chatId, 'Has the rocket been launched? yes or no');
      }
      const imgData = await FirebaseDatabaseRepository.getOne<dataImage>('/chats', chatId.toString());
      imgData.isRocketLaunched = msg.text === 'yes' ? true : false;
      const imageData = await rocketManager.getNextImage(imgData);
      FirebaseDatabaseRepository.set('chats', chatId.toString(), imageData);

      await bot.sendPhoto(chatId, imageData.urlImage);
      if (imgData.timeAsked !== 15) {
        bot.sendMessage(chatId, 'Has The Rocket been launched? yes or no');
      } else {
        bot.sendMessage(chatId, `Congratulations 🙌 🚀!!! Found Take-off!!! at ${imgData.currentFrame}`);
        FirebaseDatabaseRepository.delete('/chats', chatId.toString());
      }
    });
  }
}

export default new TelegramBotRepository();
