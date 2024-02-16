const User = require('../models/User');
const Creature = require('../models/Creature');

const getUserById = async (id) => {
    const user = await User.findById(id).populate('voted').populate('creatures').lean();
    const creatures = await Creature.find({ owner: id }).populate('owner').lean();
    return { user, creatures };
};


module.exports = {
    getUserById
}