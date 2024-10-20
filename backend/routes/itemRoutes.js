import { Router } from 'express';
import { getAllItems, createItem, deleteItem, updateItem } from '../controllers/itemController.js';
const router = Router();

router.get('/', getAllItems);
router.post('/', createItem);
router.delete('/:id', deleteItem);
router.put('/:id', updateItem);

export default router;

