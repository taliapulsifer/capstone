const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    publisher: {type: String, required: true},
    isbn: {type: String, required: true},
    status: { type: String, enum: ['available', 'checked out'], default: 'available'},
    checkedOutBy: {type: String, defualt: null},
    dueDate: {type: Date, defualt: null}
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;