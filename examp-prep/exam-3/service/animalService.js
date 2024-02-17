const Animal = require('../models/Animal');

const create = async (animal, user) => {
    return await Animal.create({
        ...animal,
        owner: user,
    });
};

const getAll = async () => {
    return await Animal.find().populate('donations').populate('owner').lean();
};
const getOne = async (id) => {
    return await Animal.findById(id).populate('donations').populate('owner').lean();
}

const donate = async (id, user) => {
    const animal = await Animal.findByIdAndUpdate(id, { $push: { donations: user } });

    return animal;
};

const getOneById = async (id) => {
    return await Animal.findById(id);
}

const edit = async (id, animalData) => {
    const animal = await Animal.findByIdAndUpdate(id, animalData, { runValidators: true });
    return animal;
}

const getRecentThree = async () => {
    return await Animal.find().sort({ createdAt: -1 }).limit(3).lean();
}

const deleteOne = async (id) => {
    return await Animal.findByIdAndDelete(id);
}

const search = async (location) => {
    let query={};
    if(location){
        query.location = new RegExp(location, 'i');
    }

    return await Animal.find(query).lean();
}

module.exports = {
    create,
    getAll,
    getOne,
    donate,
    getOneById,
    edit,
    getRecentThree,
    deleteOne,
    search
};
