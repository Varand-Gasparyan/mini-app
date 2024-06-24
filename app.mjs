import express from 'express';
import bodyParser from 'body-parser';
import { handleMessage } from './bot.mjs';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello! This is a simple Telegram bot backend.');
});

app.post('/webhook', (req, res) => {
    const update = req.body;
    handleMessage(update);
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
