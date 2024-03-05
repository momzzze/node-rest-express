const Author = require('../models/Author');



const createAuthor = async (author) => {
    const findAuthor = await Author.findOne({ name: author.name });
    try {
        if (findAuthor) {
            throw new Error('Author already exists');
        }
        const createAuthor = await Author.create(author);
        createAuthor.save();
        console.log(createAuthor);
    } catch (error) {
        console.log(error);
    }
}

const getAllAuthors = async () => {
    const allAuthors = await Author.find({}).lean();
    return allAuthors;
}


module.exports = {
    createAuthor,
    getAllAuthors
}