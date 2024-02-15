const Electronics = require('../models/Electronics');
const User = require('../models/User');

const create = async (userId, electronicsData) => {
    const createdElectronics = await Electronics.create({
        owner: userId,
        ...electronicsData
    })
    return createdElectronics;
};
const getAll = async () => {
    const electronics = await Electronics.find().populate('owner').lean();
    return electronics;
};

const getById = async (id) => {
    const electronics = await Electronics.findById(id).populate('owner').populate('buyingList').lean();
    return electronics;
};
const buy = async (electronicsId, userId) => {
    await Electronics.findByIdAndUpdate(electronicsId, {
        $push: {
            buyingList: userId
        }
    });
    await User.findByIdAndUpdate(userId, {
        $push: {
            buying: electronicsId
        }
    });
}
const deleteOne = (id) => {
    return Electronics.findByIdAndDelete(id);
}
const updateOne = (id, electronicsData) => {
    return Electronics.findByIdAndUpdate(id, electronicsData, { runValidators: true });
}

const search = async (name, type) => {
    let query = {};
    if (name) {
        query.name = new RegExp(name, 'i');
    }

    if (type) {
        query.type = type.toLowerCase();
    }
    return await Electronics.find(query).lean();
}

module.exports = {
    create,
    getAll,
    getById,
    buy,
    deleteOne,
    updateOne,
    search
};