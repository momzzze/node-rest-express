const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const usersPath = path.resolve('data/users.json');

const getUsers = () => {
    const users = fs.readFileSync('./data/users.json');
    if (users.length === 0) {
        return [];
    }
    return JSON.parse(users);
}

const saveUsers = (users) => {
    fs.writeFileSync('./data/users.json', JSON.stringify(users));
}


const addUser = async (body) => {
    const { username, password } = body;
    try {
        const salt = await bcrypt.genSalt(10);
        const cryptedPassword = await bcrypt.hash(password, salt);
        const user = {
            id: uuidv4(),
            username: username,
            password: cryptedPassword
        }
        const users = getUsers();
        users.push(user);
        saveUsers(users);
        return user;
    } catch (error) {
        console.log(error);
    }
}

const getUserById = (id) => {
    const users = getUsers();
    return users.find(user => user.id === id);
}

const getUserByUsername = (username) => {
    const users = getUsers();
    return users.find(user => user.username === username);
}

const loginUser = async (body) => {
    const { username, password } = body;
    try {
        const user = await getUserByUsername(username);
        if (!user) {
            throw new Error('User not found');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Wrong credentials');
        }
        return user;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    addUser,
    getUserById,
    getUserByUsername,
    loginUser
}