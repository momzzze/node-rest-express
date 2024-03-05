const handlebars = require('express-handlebars');
const paginateHelper = require('express-handlebars-paginate');
const path = require('path');

function handlebarsConfig(app) {
    const hbs = handlebars.create({
        extname: 'hbs',
    });
    // app.engine('hbs', handlebars.engine({
    //     extname: 'hbs',
    // }));
    app.engine('hbs', hbs.engine)
    app.set('view engine', 'hbs');
    app.set('views', path.resolve('views'));
    hbs.handlebars.registerHelper('paginateHelper', paginateHelper.createPagination);
    hbs.handlebars.registerHelper('math', function (lvalue, operator, rvalue, options) {
        lvalue = parseFloat(lvalue);
        rvalue = parseFloat(rvalue);

        return {
            '+': lvalue + rvalue,
            '-': lvalue - rvalue,
        }[operator];
    });
    return app
}

module.exports = handlebarsConfig;
