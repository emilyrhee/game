const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 8000;


const contentType = {
    '.html': 'text/html',
    '.txt': 'text/plain',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.csv': 'text/csv',
    '.png': 'image/png',
    '.ico': 'image/png',
    '.jpg': 'image/jpeg',
    '.json': 'application/json',
    '.wasm': 'application/wasm'
}

const server = http.createServer((request, result) => {
    function pageNotFound(result) {
        filePath = path.resolve('./public/404.html');
        result.statusCode = 404;
        result.setHeader('Content-Type', 'text/html');
    }

    console.log('Request for ' + request.url + ' by method ' + request.method);

    if (request.method == 'GET') {
        var fileUrl;
        if (request.url == '/') {
            fileUrl = '/index.html';
        } else {
            fileUrl = request.url;
        }

        var filePath = path.resolve('./public' + fileUrl);
        const fileExt = path.extname(filePath);
        if (fileExt == '.html') {
            fs.existsSync(filePath, (exists) => {
                if (!exists) {
                    pageNotFound(result);
                    return;
                }
                result.statusCode = 200;
                result.setHeader('Content-Type', 'text/html');
            });
        } else if (fileExt in contentType) {
            result.statusCode = 200;
            result.setHeader('Content-Type', contentType[fileExt]);
        } else {
            pageNotFound(result);
        }
    } else {
        pageNotFound(result);
    }
    fs.createReadStream(filePath).pipe(result);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
