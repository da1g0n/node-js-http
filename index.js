'use strict';
const http = require('http');
const server = http.createServer((req, res) => {
    const now = new Date();
    console.info(`[${now}] Requested By ${req.connection.remoteAddress}`);
    res.writeHead(200, {
        'Content-Type': 'text/html',
        'charser': 'utf-8',
    });
    switch(req.method) {
        case 'GET':
            const fs = require('fs');
            const rs = fs.createReadStream('./form.html');
            rs.pipe(res);
            break;
        case 'POST':
            res.write(`POST ${req.url}`);
            req.on('data', (data) => {
                const decoded = decodeURIComponent(data);
                console.info(`[${now}] 投稿: ${decoded}`);
                res.write(`<!DOCTYPE html><html lang="ja">
                <head><meta charset="UTF-8"></head>
                <body><h1>${decoded}が投稿されました</h1></body>
                </html>`);
                res.end();
            });
            break;
        default:
            break;
    }
}).on('error', (e) => {
    console.error(`[${new Date}] Server Error`, e);
}).on('clientError', (e) => {
    console.error(`[${new Date}] Client Error`, e);
});

const port = process.env.PORT || 8000;
server.listen(port, () => {
    console.log(`Listening on ${port}`);
});