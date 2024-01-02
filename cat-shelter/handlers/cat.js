const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const formidable = require('formidable');

const cats = require('../data/cats.json');
const breeds = require('../data/breeds.json');

module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;
    let catBreedPlaceholder = breeds.map((breed) => `<option value="${breed}">${breed}</option>`);


    if (pathname === '/cats/add-cat' && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, '../views/addCat.html'));
        const index = fs.createReadStream(filePath);

        index.on('data', (data) => {
            let modifiedData = data.toString().replace('{{catBreeds}}', catBreedPlaceholder);
            res.write(modifiedData);
        });

        index.on('end', () => {
            res.end();
        });

        index.on('error', (err) => {
            console.log(err);
        });

    }
    else if (pathname === '/cats/add-cat' && req.method === 'POST') {
        let form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            if (err) { throw err; }

            let oldPath = files.upload[0].filepath;
            let newPath = path.normalize(path.join(__dirname, '../content/images/' + files.upload[0].originalFilename));

            fs.copyFile(oldPath, newPath, (err) => {
                if (err) {
                    throw err;
                }
                console.log('Files was uploaded successfully!');
            });

            fs.readFile(path.join(__dirname, '../data/cats.json'), 'utf-8', (err, data) => {
                if (err) {
                    throw err;
                }
                let allCats = JSON.parse(data);
                allCats.push({ id: cats.length + 1, ...fields, image: files.upload[0].originalFilename });
                let json = JSON.stringify(allCats);
                fs.writeFile(path.join(__dirname, '../data/cats.json'), json, 'utf-8', () => {
                    console.log('The cat was uploaded successfully!');
                    res.writeHead(302, { Location: '/' });
                    res.end();
                });
            });
        })
    }
    else if (pathname === '/cats/add-breed' && req.method === 'POST') {
        let formData = '';
        req.on('data', (chunk) => {
            formData += chunk;
        });
        console.log(formData);
        req.on('end', () => {
            let body = qs.parse(formData);


            fs.readFile(path.join(__dirname, '../data/breeds.json'), (err, data) => {
                if (err) {
                    throw err;
                }

                let breeds = JSON.parse(data);
                breeds.push(body.breed);
                let json = JSON.stringify(breeds);

                fs.writeFile(path.join(__dirname, '../data/breeds.json'), json, 'utf-8', () => {
                    console.log('The breed was uploaded successfully!');
                });
            })
            res.writeHead(302, { Location: '/' });
            res.end();
        })


    }
    else if (pathname === '/cats/add-breed' && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, '../views/addBreed.html'));
        const index = fs.createReadStream(filePath);

        index.on('data', (data) => {
            res.write(data);
        });

        index.on('end', () => {
            res.end();
        });

        index.on('error', (err) => {
            console.log(err);
        });
    }
    else if (pathname.includes('/cats-edit') && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, '../views/editCat.html'));
        const catId = parseInt(pathname.split('/').pop());
        const currentCat = cats.find((cat) => cat.id === catId);
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
                let modifiedData = data.toString()
                    .replace('{{id}}', catId)
                    .replace('{{name}}', currentCat.name)
                    .replace('{{description}}', currentCat.description);
                const breedsAsOptions = breeds.map((breed) => `<option value="${breed}">${breed}</option>`);
                modifiedData = modifiedData.replace('{{catBreeds}}', breedsAsOptions.join('\n'));
                modifiedData = modifiedData.replace('{{breed}}', currentCat.breed);
                res.write(modifiedData);
                res.end();
            }
        })
    }
    else if (pathname.includes('/cats-find-new-home') && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, '../views/catShelter.html'));
        const catId = parseInt(pathname.split('/').pop());
        const currentCat = cats.find((cat) => cat.id === catId);
        if (currentCat) {
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(404, {
                        'Content-Type': 'text/plain'
                    });
                    res.write('404 not found');
                    res.end();
                } else {
                    console.log(currentCat);
                    let modifiedData = data.toString().replace('{{id}}', catId);
                    modifiedData = modifiedData.replace('{{name}}', currentCat.name)
                        .replace('{{description}}', currentCat.description)
                        .replace('{{names}}', currentCat.name)
                        .replace('{{breed}}', currentCat.breed)
                        .replace('{{image}}', path.join('./content/images/', currentCat.image));
                    const breedsAsOptions = breeds.map((breed) => `<option value="${breed}">${breed}</option>`);
                    modifiedData = modifiedData.replace('{{catBreeds}}', breedsAsOptions.join('\n'));
                    modifiedData = modifiedData.replace('{{breed}}', currentCat.breed);
                    res.write(modifiedData);
                    res.end();
                }
            })
        }
    }
    else if (pathname.includes('/cats-edit') && req.method === 'POST') {
        let form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            if (err) { throw err; }
            let oldPath = files.upload[0].filepath;
            let newPath = path.normalize(path.join(__dirname, '../content/images/' + files.upload[0].originalFilename));



            if (fields) {
                fs.readFile(path.join(__dirname, '../data/cats.json'), 'utf-8', (err, data) => {
                    if (err) {
                        throw err;
                    } else {
                        let currentCats = JSON.parse(data);
                        const catId = parseInt(pathname.split('/').pop());
                        let currentCat = currentCats.find((cat) => cat.id === catId);
                        let imagePath = path.join('./content/images/', currentCat.image);

                        fs.unlink(imagePath, (err) => {
                            if (err) {
                                throw err;
                            }
                            console.log('Files was uploaded successfully!');
                        });

                        fs.copyFile(oldPath, newPath, (err) => {
                            if (err) {
                                throw err;
                            }
                            console.log('Files was uploaded successfully!');
                        });

                        currentCat.name = fields.name;
                        currentCat.description = fields.description;
                        currentCat.breed = fields.breed;
                        currentCat.image = files.upload[0].originalFilename;
                        let json = JSON.stringify(currentCats);
                        fs.writeFile(path.join(__dirname, '../data/cats.json'), json, 'utf-8', () => {
                            console.log('The cat was uploaded successfully!');
                            res.writeHead(302, { Location: '/' });
                            res.end();
                        });
                    }
                });
            }



            // console.log(fields);

        })
    }
    else if (pathname.includes('/cats-find-new-home') && req.method === 'POST') {
        const catId = parseInt(pathname.split('/').pop());
        const currentCat = cats.find((cat) => cat.id === catId);
        if (currentCat) {
            fs.readFile(path.join(__dirname, '../data/cats.json'), 'utf-8', (err, data) => {
                if (err) {
                    throw err;
                } else {
                    let currentCats = JSON.parse(data);
                    let imagePath = path.join('./content/images/', currentCat.image);

                    fs.unlink(imagePath, (err) => {
                        if (err) {
                            throw err;
                        }
                        console.log('Files was uploaded successfully!');
                    });
                    currentCats = currentCats.filter((cat) => cat.id !== catId);
                    let json = JSON.stringify(currentCats);
                    fs.writeFile(path.join(__dirname, '../data/cats.json'), json, 'utf-8', () => {
                        console.log('The cat was removed successfully!');
                        res.writeHead(302, { Location: '/' });
                        res.end();
                    });
                }
            });
        }
    }
}