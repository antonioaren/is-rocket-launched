import TelegramBot from 'node-telegram-bot-api';
import rocketManager from '../manager/rocket.manager';
import FirebaseDatabaseRepository from './firebase-realtime-db.repository';
import { dataImage } from '../data/image-data';

class TelegramBotRepository {
  constructor() {}

  public initializaBot() {
    const bot = new TelegramBot(process.env.TELEGRAM_TOKEN as string, { polling: true });

    bot.onText(/^\/start/, async msg => {
      await this.startConversation(bot, msg);
    });

    bot.on('message', async msg => {
      await this.mainConversation(bot, msg);
    });
  }

  public async startConversation(bot: TelegramBot, msg: TelegramBot.Message) {
    var chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Hello!!!, We gonna start a little game to know when the rocket has been launched!🚀');
    const imageData = await rocketManager.getRocketImage();
    FirebaseDatabaseRepository.set('chats', chatId.toString(), imageData);
    await bot.sendPhoto(chatId, imageData.urlImage);
    bot.sendMessage(chatId, 'Has the rocket been launched? yes or no');
  }

  public async mainConversation(bot: TelegramBot, msg: TelegramBot.Message) {
    const chatId = msg.chat.id;
    if (msg.text?.toLocaleLowerCase() === '/start') return;
    if (msg.text?.toLocaleLowerCase() !== 'yes' && msg.text !== 'no') {
      return bot.sendMessage(chatId, 'Has the rocket been launched? yes or no');
    }
    const imgData = await FirebaseDatabaseRepository.getOne<dataImage>('/chats', chatId.toString());
    imgData.isRocketLaunched = msg.text.toLocaleLowerCase() === 'yes' ? true : false;
    const imageData = await rocketManager.getNextImage(imgData);
    FirebaseDatabaseRepository.set('chats', chatId.toString(), imageData);

    await bot.sendPhoto(chatId, imageData.urlImage);
    this.sendFinalTextPart(bot, imgData, chatId);
  }

  public sendFinalTextPart(bot: TelegramBot, imgData: dataImage, chatId: number) {
    if (imgData.timeAsked !== 15) {
      bot.sendMessage(chatId, 'Has The Rocket been launched? yes or no');
    } else {
      bot.sendMessage(chatId, `Congratulations 🙌 🚀!!! Found Take-off!!! at ${imgData.currentFrame}`);
      FirebaseDatabaseRepository.delete('/chats', chatId.toString());
    }
  }
}

export default new TelegramBotRepository();
