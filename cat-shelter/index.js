const http = require('http');
const PORT = 3005;
const handlers = require('./handlers')


const server = http.createServer((req, res) => {
    for (let handler of handlers) {
        if (!handler(req, res)) {
            break;
        }
    }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));