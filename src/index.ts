import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import * as admin from 'firebase-admin';
import TelegramBot from 'node-telegram-bot-api';
import rocketManager from './manager/rocket.manager';
import FirebaseDatabaseRepository from './repository/firebase-realtime-db.repository';

// import apiRoutes from './routes';
dotenv.config();

const app = express();
app.use(bodyParser.json());

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN as string, { polling: true });

admin.initializeApp({
  credential: admin.credential.cert('src/environment/firebase/with-madrid-test-firebase-adminsdk.json'),
  databaseURL: 'https://with-madrid-test-default-rtdb.firebaseio.com',
});



bot.onText(/^\/start/, async msg => {
  var chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Hello, ' + 'We gonna start a little game to know if rocket has launched!🚀');
  const imageData = await rocketManager.getRocketImage();
  //set en la base de datos
  FirebaseDatabaseRepository.set('chats', chatId.toString(), imageData);

  await bot.sendPhoto(chatId, imageData.urlImage);
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

//TODO: Add a env to do not leave this.
app.listen(process.env.PORT, () => {
  console.log(`Connected to ${process.env.PORT}`);
});
