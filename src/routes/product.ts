import { Router } from "express";
import { addProduct, deleteProduct, getAllProduct, getSingleProduct, updateProduct } from "../controllers/product";

const router = Router();

router.get('/', getAllProduct);
router.get('/:id', getSingleProduct);
router.post('/insert', addProduct);
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);

export default router;