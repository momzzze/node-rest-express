const url = require('url');
const fs = require('fs');
const path = require('path');
const cats = require('../data/cats.json');
module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;
    if (pathname === '/' && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, '../views/home/index.html'));
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                res.write('404 not found');
                res.end();
            } else {
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                let modifiedCats = cats.map((cat) => `
                    <li>
                    <img src="${path.join('./content/images/', cat.image)}" alt="${cat.name}">
                    <h3>${cat.name}</h3>
                    <p><span>Breed: </span>${cat.breed}</p>
                    <p><span>Description: </span>${cat.description}</p>
                    <ul class="buttons">
                        <li class="btn edit"><a href="/cats-edit/${cat.id}">Change Info</a></li>
                        <li class="btn delete"><a href="/cats-find-new-home/${cat.id}">New Home</a></li>
                    </ul>
                    </li>`);
                let modifiedData = data.toString().replace('{{cats}}', modifiedCats);

                res.write(modifiedData);
                res.end();
            }
        })
    } else if (pathname === '/search' && req.method === 'GET') {
        const query = url.parse(req.url, true).query;
        const searchQuery = query.q.toLowerCase().trim();
        const filteredCats = cats.filter(cat => {
            return (
                cat.name[0].toLowerCase().includes(searchQuery) ||
                cat.breed[0].toLowerCase().includes(searchQuery) ||
                cat.description[0].toLowerCase().includes(searchQuery)
            );
        });
        console.log(filteredCats);
        let searchResult = '';
        if (filteredCats.length > 0) {
            searchResult = '<ul>';
            filteredCats.forEach(cat => {
                searchResult += `
                <li>
                <img src="${path.join('./content/images/', cat.image)}" alt="${cat.name}">
                <h3>${cat.name}</h3>
                <p><span>Breed: </span>${cat.breed}</p>
                <p><span>Description: </span>${cat.description}</p>
                <ul class="buttons">
                    <li class="btn edit"><a href="/cats-edit/${cat.id}">Change Info</a></li>
                    <li class="btn delete"><a href="/cats-find-new-home/${cat.id}">New Home</a></li>
                </ul>
                </li>
                `;
            });
            searchResult += '</ul>';
        } else {
            searchResult = '<p>No cats found for the search query.</p>';
        }
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write(searchResult);
        res.end();
    } else {
        return true;
    }
}