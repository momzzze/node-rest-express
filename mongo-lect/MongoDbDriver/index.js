const { MongoClient } = require('mongodb');
const connectionString = 'mongodb://localhost:27017';
const client = new MongoClient(connectionString);

async function run() {
    const db = client.db('test1');
    const collection = db.collection('students');

    const students = await collection.find({ name: 'Pesho' }).toArray();
    console.log(students);
}

run();