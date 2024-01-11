const messageBroker = require('./messageBroker');

messageBroker.subscribe('request', add)
messageBroker.subscribe('user-register', userRegister)

function add(data) {
    console.log(`Reporting service:` + data);
}

function userRegister(data) {
    console.log(`Reporting service: User register` + data.username);
}

module.exports = add;