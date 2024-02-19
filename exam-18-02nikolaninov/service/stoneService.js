const Stone = require('../models/Stone');


const create = (data, userId) => {
    const stone = Stone.create({
        ...data,
        owner: userId
    });
    return stone;
}

const getAllStones = async () => {
    const stones = await Stone.find().populate('owner').populate('likedList').lean();
    return stones;
}
const getOne = async (id) => {
    const stone = await Stone.findById(id).populate('owner').populate('likedList').lean();
    return stone;
}
const like = async (stoneId, userId) => {
    await Stone.findByIdAndUpdate(stoneId, {
        $push: {
            likedList: userId
        }
    });
}
const getRecentThree = async () => {
    const stones = await Stone.find().sort({ createdAt: -1 }).limit(3).lean();
    return stones;
}
const getById = async (id) => {
    const stone = await Stone.findById(id).populate('owner');
    return stone;
}
const edit = async (id, data) => {
    const stone = await Stone.findByIdAndUpdate(id, data, { runValidators: true });
    return stone;
}
const deleteOne = async (id) => {
    return await Stone.findByIdAndDelete(id);
}

const search = (name) => {
    return Stone.find({ name: { $regex: name, $options: 'i' } }).lean();
}

module.exports = {
    create,
    getAllStones,
    getOne,
    like,
    getRecentThree,
    getById,
    edit,
    deleteOne,
    search
}