const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

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
// случайный предмет
bot.onText(/\/randomItem/, async (msg) => {

    try {

        const response = await axios.get(
            'http://localhost:3000/randomItem'
        );

        const item = response.data;

        bot.sendMessage(
            msg.chat.id,
            `(${item.id}) - ${item.name}: ${item.desc}`
        );

    } catch {

        bot.sendMessage(
            msg.chat.id,
            'Ошибка'
        );
    }

});


// предмет по ID
bot.onText(/\/getItemByID (.+)/, async (msg, match) => {

    try {

        const id = match[1];

        const response = await axios.get(
            `http://localhost:3000/getItemByID?id=${id}`
        );

        const item = response.data;

        if (!item) {

            bot.sendMessage(
                msg.chat.id,
                'Ошибка'
            );

            return;
        }

        bot.sendMessage(
            msg.chat.id,
            `(${item.id}) - ${item.name}: ${item.desc}`
        );

    } catch {

        bot.sendMessage(
            msg.chat.id,
            'Ошибка'
        );
    }

});


// удаление предмета
bot.onText(/\/deleteItem (.+)/, async (msg, match) => {

    try {

        const id = match[1];

        const response = await axios.get(
            `http://localhost:3000/deleteItem?id=${id}`
        );

        if (response.data.deleted) {

            bot.sendMessage(
                msg.chat.id,
                'Удачно'
            );

        } else {

            bot.sendMessage(
                msg.chat.id,
                'Ошибка'
            );
        }

    } catch {

        bot.sendMessage(
            msg.chat.id,
            'Ошибка'
        );
    }

});
// ошибки
bot.on('polling_error', console.log);