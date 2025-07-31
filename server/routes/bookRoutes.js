import express from 'express'
import { protect } from '../middleware/authMiddleware.js';
import { addNewBook, homePage } from '../controllers/bookRoutesControllers.js';
import { addBookValidationRules } from '../middleware/bookValidation.js';
const router = express.Router()

router.get('/',protect,homePage)
router.post('/addnewbook',protect,addBookValidationRules,addNewBook)



export default router;