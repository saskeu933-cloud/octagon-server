const express = require('express');

const app = express();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ChatBotTests'
});

connection.connect((err) => {
    if (err) {
        console.log('Ошибка подключения');
        return;
    }

    console.log('MySQL подключен');
});

app.get('/', (req, res) => {
    res.send('<h1>Привет, Октагон!</h1>');
});

app.get('/static', (req, res) => {
    res.json({
        header: 'Hello',
        body: 'Octagon NodeJS Test'
    });
});

app.get('/dynamic', (req, res) => {

    const a = Number(req.query.a);
    const b = Number(req.query.b);
    const c = Number(req.query.c);

    if (
        req.query.a === undefined ||
        req.query.b === undefined ||
        req.query.c === undefined ||
        isNaN(a) ||
        isNaN(b) ||
        isNaN(c)
    ) {
        return res.json({
            header: 'Error'
        });
    }

    const result = (a * b * c) / 3;

    res.json({
        header: 'Calculated',
        body: String(result)
    });
});
app.get('/getAllItems', (req, res) => {

    connection.query(
        'SELECT * FROM Items',
        (err, results) => {

            if (err) {
                console.log(err);
                return res.json(null);
            }

            res.json(results);
        }
    );

});
app.get('/addItem', (req, res) => {

    const name = req.query.name;
    const desc = req.query.desc;

    if (
        name === undefined ||
        desc === undefined
    ) {
        return res.json(null);
    }

    connection.query(
        'INSERT INTO Items(name, `desc`) VALUES(?, ?)',
        [name, desc],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.json(null);
            }

            res.json({
                id: result.insertId,
                name: name,
                desc: desc
            });

        }
    );

});
app.get('/deleteItem', (req, res) => {

    const id = Number(req.query.id);

    if (
        req.query.id === undefined ||
        isNaN(id)
    ) {
        if (req.query.id === undefined) {
    return res.json({
        error: 'Missing id'
    });
}
    }

    connection.query(
        'DELETE FROM Items WHERE id = ?',
        [id],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.json({
    error: 'Parameters name and desc are required'
});
            }

            res.json({
                deleted: result.affectedRows > 0
            });
        }
    );

});

app.get('/updateItem', (req, res) => {

    const id = Number(req.query.id);
    const name = req.query.name;
    const desc = req.query.desc;

    if (
        req.query.id === undefined ||
        name === undefined ||
        desc === undefined ||
        isNaN(id)
    ) {
        if (
    req.query.id === undefined ||
    name === undefined ||
    desc === undefined ||
    isNaN(id)
) {
    return res.json({
        error: 'Missing parameters'
    });
}
    }

    connection.query(
        'UPDATE Items SET name = ?, `desc` = ? WHERE id = ?',
        [name, desc, id],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.json(null);
            }

            res.json({
                updated: result.affectedRows > 0
            });
        }
    );

});
// случайный предмет
app.get('/randomItem', (req, res) => {

    connection.query(
        'SELECT * FROM Items ORDER BY RAND() LIMIT 1',
        (err, results) => {

            if (err || results.length === 0) {
                return res.json(null);
            }

            res.json(results[0]);
        }
    );

});

// предмет по ID
app.get('/getItemByID', (req, res) => {

    const id = Number(req.query.id);

    if (
        req.query.id === undefined ||
        isNaN(id)
    ) {
        return res.json(null);
    }

    connection.query(
        'SELECT * FROM Items WHERE id = ?',
        [id],
        (err, results) => {

            if (err || results.length === 0) {
                return res.json(null);
            }

            res.json(results[0]);
        }
    );

});
app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});
