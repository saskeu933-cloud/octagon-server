const TelegramBot = require('node-telegram-bot-api');

const token = '8783114101:AAERnOdm02bU28nVZX7IN_RDxKSCdKUJ95A';

const bot = new TelegramBot(token, {
    polling: true
});

// старт
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Привет, октагон!');
});

// help
bot.onText(/\/help/, (msg) => {
    bot.sendMessage(
        msg.chat.id,
        '/site - ссылка на сайт Октагона\n' +
        '/creator - информация о создателе'
    );
});

// site
bot.onText(/\/site/, (msg) => {
    bot.sendMessage(
        msg.chat.id,
        'https://octagon.media/'
    );
});

// creator
bot.onText(/\/creator/, (msg) => {
    bot.sendMessage(
        msg.chat.id,
        'Тимофеев Иван Романович'
    );
});

// ошибки
bot.on('polling_error', console.log);