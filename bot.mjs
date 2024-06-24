import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

export async function setWebhook() {
    const webhookUrl = `${process.env.WEBHOOK_URL}`;
    const response = await fetch(`${TELEGRAM_API_URL}/setWebhook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: webhookUrl })
    });
    const data = await response.json();
    console.log(data);
}

export async function sendMessage(chatId, text) {
    const url = `${TELEGRAM_API_URL}/sendMessage`;
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: text })
    });
    const data = await response.json();
    console.log(data);
}

export function handleMessage(update) {
    if (update.message && update.message.text) {
        const chatId = update.message.chat.id;
        const text = update.message.text;
        sendMessage(chatId, `You said: ${text}`);
    }
}

if (process.argv.includes('--set-webhook')) {
    setWebhook();
}