import { body } from 'express-validator';

export const addBookValidationRules = [
    body('title', 'Title is required').notEmpty(),
    body('author', 'Author is required').notEmpty(),
];