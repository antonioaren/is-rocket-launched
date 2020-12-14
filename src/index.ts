import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import * as admin from 'firebase-admin';
import botManager from './manager/bot.manager';


// import apiRoutes from './routes';
dotenv.config();

const app = express();
app.use(bodyParser.json());


admin.initializeApp({
  credential: admin.credential.cert('src/environment/firebase/with-madrid-test-firebase-adminsdk.json'),
  databaseURL: 'https://with-madrid-test-default-rtdb.firebaseio.com',
});

botManager.inicializeBots();

//TODO: Add a env to do not leave this.
app.listen(process.env.PORT, () => {
  console.log(`Connected to ${process.env.PORT}`);
});
