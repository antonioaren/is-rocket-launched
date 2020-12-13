import express from 'express';
import bodyParser from 'body-parser';
import TelegramBot from 'node-telegram-bot-api';
import rocketManager from './manager/rocket.manager';
// import apiRoutes from './routes';

const app = express();
app.use(bodyParser.json());

const TOKEN = '1478607319:AAH_Lm8v46EhXtcTV5tNVJT8jb45GIKs5GY';
const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/^\/start/, async msg => {
  var chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Hello, ' + 'We gonna start a little game to know if rocket has launched!🚀');
  const data = await rocketManager.getRocketImage();
  await bot.sendPhoto(chatId, data.urlImage);
  bot.sendMessage(chatId, 'Has Rocket been launched? yes or no');
});

bot.on('message', msg => {
  if (msg.text === '/start') return;
  const chatId = msg.chat.id;
  console.log({ msg });
  if (msg.text === 'yes') {
  } else if (msg.text === 'no') {
  } else {
    bot.sendMessage(chatId, 'Has Rocket been launched? yes or no');
  }
});

// app.use('/api', apiRoutes);

//TODO: Add a env to do not leave this.
app.listen(3000, () => {
  console.log(`Connected to ${3000}`);
});
