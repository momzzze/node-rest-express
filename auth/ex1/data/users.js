const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const usersPath = path.resolve('data/users.json');
const bcrypt = require('bcrypt');
const salt = 10;


const getUsers = () => {
    const users = fs.readFileSync('./data/users.json');
    return JSON.parse(users);
}

const saveUsers = (users) => {
    fs.writeFileSync('./data/users.json', JSON.stringify(users));
}


const addUser =async (username, password) => {
    const cryptedPassword=await bcrypt.genSalt(salt)

    const user = {
        id: uuidv4(),
        username: username,
        password: password
    }
    const users = getUsers();
    users.push(user);
    saveUsers(users);
    return user;
}

const getUserById = (id) => {
    const users = getUsers();
    return users.find(user => user.id === id);
}

const getUserByUsername = (username) => {
    const users = getUsers();
    return users.find(user => user.username === username);
}


module.exports = {
    addUser,
    getUserById,
    getUserByUsername
}