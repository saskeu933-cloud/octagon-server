const TelegramBot = require('node-telegram-bot-api');

const token = '8783114101:AAERnOdm02bU28nVZX7IN_RDxKSCdKUJ95A';

const bot = new TelegramBot(token, {
    polling: true
});

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(
        msg.chat.id,
        'Привет, октагон!'
    );
});

bot.on('polling_error', (err) => {
    console.log(err);
});

bot.getMe()
    .then(console.log)
    .catch(console.error);
    