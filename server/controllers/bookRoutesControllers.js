import Book from "../models/Book.js";
import { validationResult } from 'express-validator';

export const homePage = async (req, res,next) => {
    try {
    console.log("Haii");
        const books = await Book.find({});
        res.status(200).json(books);
    } catch (error) {
        console.error(error,"Error while getting books");
        next(error);
    }
}



export const addNewBook = async (req, res,next) => {

     const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { title, author } = req.body;

        try {
            const book = new Book({ title, author });
            await book.save();
            res.status(201).json(book);
        } catch (error) {
            console.error(error);
            next(error)
        }
}