import express from 'express';
import bodyParser from 'body-parser';
import apiRoutes from './routes';

const app = express();

app.use(bodyParser.json());

app.use('/api', apiRoutes);

//TODO: Add a env to do not leave this.
app.listen(3000, () => {
  console.log(`Connected to ${3000}`);
});
