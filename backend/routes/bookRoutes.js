import { Router } from "express";
import { getBooks, createBook, deleteBook, updateBook } from "../controllers/bookController.js";
const router = Router();

router.get('/', getBooks);
router.post('/', createBook);
router.delete('/:id', deleteBook);
router.put('/:id', updateBook);

export default router;