const Book = require('../models/Book');
const Author = require('../models/Author');

const createBook = async (book) => {

    const findBook = await Book.findOne({ title: book.title });
    const author = await Author.findOne({ _id: book.author });
    try {
        if (findBook) {
            throw new Error('Book already exists');
        }
        const createBook = await Book.create(book);
        await author.publishedBooks.push(createBook)
        await createBook.save();
        await author.save();

    } catch (error) {
        console.log(error);
    }
}

const getAllBooks = async (skip, pageSize) => {
    const totalBooks = await Book.countDocuments({});
    const totalPages = Math.ceil(totalBooks / pageSize);


    const allBooks = await Book.find({})
        .populate({
            path: 'author',
            select: 'name birthDate imageUrl biography',
        }).skip(skip).limit(pageSize)
        .lean();
    return {
        books: allBooks,
        totalPages,
    };
}

const getBookById = async (id) => {
    const book = await Book.findById(id).populate({
        path: 'author',
        select: 'name birthDate imageUrl biography publishedBooks',
        populate: {
            path: 'publishedBooks',
            select: 'title description imageUrl publishedDate',
        },
    }).populate({
        path: 'genre',
        select: 'name',
    }).lean();

    return book;
}

module.exports = {
    createBook,
    getAllBooks,
    getBookById,
}