import mongoose from 'mongoose';

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
    },
    author: {
        type: String,
        required: [true, 'Please add an author'],
        trim: true,
    },
}, {
    timestamps: true,
});

const Book = mongoose.model('Book', bookSchema);

export default Book;