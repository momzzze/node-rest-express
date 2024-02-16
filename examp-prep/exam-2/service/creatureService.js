const Creature = require('../models/Creature');
const User = require('../models/User');

const create = async (ownerId, creatureData) => {
    const creature = await Creature.create({
        ...creatureData,
        owner: ownerId
    });

    await User.findByIdAndUpdate(ownerId, { $push: { creatures: creature._id } });
    return creature;
}
const getAll = async () => {
    const creatures = await Creature.find().lean();
    return creatures;
}
const getOne = async (id) => {
    const creature = await Creature.findById(id).populate('owner').populate('votes').lean();
    return creature;
}
const vote = async (creatureId, userId) => {
    await Creature.findByIdAndUpdate(creatureId, { $push: { votes: userId } });
    await User.findByIdAndUpdate(userId, { $push: { voted: creatureId } });
};
const getOneById = async (id) => {
    const creature = await Creature.findById(id).populate('owner').populate('votes').lean();
    return creature;
}

const update = async (id, creatureData) => {
    const creature = await Creature.findByIdAndUpdate(id, creatureData, { runValidators: true });
    return creature;
}

const deleteOne = async (id) => {
    await Creature.findByIdAndDelete(id);
}


module.exports = {
    create,
    getAll,
    getOne,
    vote,
    getOneById,
    update,
    deleteOne
}