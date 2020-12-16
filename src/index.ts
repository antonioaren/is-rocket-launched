import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import * as admin from 'firebase-admin';
import botManager from './manager/bot.manager';
import Axios from 'axios';

// import apiRoutes from './routes';
dotenv.config();

const app = express();
app.use(bodyParser.json());

// To keep heroku wake up, I will include a petition every 30 mins.

setInterval(async (_) => {
  Axios.get('https://launchedrocket.herokuapp.com/')
}, 1800000)

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://with-madrid-test-default-rtdb.firebaseio.com',
});

botManager.inicializeBots();

//TODO: Add a env to do not leave this.
app.listen(process.env.PORT, () => {
  console.log(`Connected to ${process.env.PORT}`);
});
