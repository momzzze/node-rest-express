const http = require('http');
const fs=require('fs');
const server = http.createServer((req, res) => {
    const name ="Nikola";

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    let html=fs.readFileSync('./index.html', 'utf8')
    html=html.replace('{{name}}', name)
    res.end(html)
});

server.listen(3000, () => {
    console.log('server is running on port 3000')
});