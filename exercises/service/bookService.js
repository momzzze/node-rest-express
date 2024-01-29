const Book = require('../models/Book');
const Author = require('../models/Author');

const createBook = async (book) => {
    
    const findBook = await Book.findOne({ title: book.title });
    const author=await Author.findOne({_id:book.author}); 
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

const getAllBooks = async () => {
    const allBooks = await Book.find({})
    .populate({
        path:'author',
        select:'name birthDate imageUrl biography',
    })
    .lean();
    return allBooks;
}

module.exports = {
    createBook,
    getAllBooks
}