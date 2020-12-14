import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import TelegramBot from 'node-telegram-bot-api';
import rocketManager from './manager/rocket.manager';
// import apiRoutes from './routes';

const app = express();
app.use(bodyParser.json());


const bot = new TelegramBot(process.env.TELEGRAM_TOKEN as string, { polling: true });

bot.onText(/^\/start/, async msg => {
  var chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Hello, ' + 'We gonna start a little game to know if rocket has launched!🚀');
  const data = await rocketManager.getRocketImage();
  //set en la base de datos
  await bot.sendPhoto(chatId, data.urlImage);
  bot.sendMessage(chatId, 'Has Rocket been launched? yes or no');
});

bot.on('message', msg => {
  if (msg.text === '/start') return;
  const chatId = msg.chat.id;
  console.log({ msg });
  if (msg.text === 'yes') {
    //get en la base de datos de los datos
    //Pedir siguiente
    //set en la base de datos.
  } else if (msg.text === 'no') {
    //Pedir los datos
    //Pedir siguiente
  } else {
    bot.sendMessage(chatId, 'Has Rocket been launched? yes or no');
  }
});

// app.use('/api', apiRoutes);

//TODO: Add a env to do not leave this.
app.listen(process.env.PORT, () => {
  console.log(`Connected to ${process.env.PORT}`);
});
