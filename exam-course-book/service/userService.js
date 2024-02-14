const User = require('../models/User');

const getInfo = async (id) => {
    return await User.findById(id).populate('createdCourses').populate('signedCourses');
}


module.exports = {
    getInfo
}