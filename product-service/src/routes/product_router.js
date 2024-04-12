import express from 'express';
import {
    getProductById,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from '../controllers/product_handler.js';

const productRouter = express.Router();

productRouter.get('/', getProducts);
productRouter.get('/:id', getProductById);
productRouter.post('/create', createProduct);
productRouter.put('/update/:id', updateProduct);
productRouter.delete('/delete/:id', deleteProduct);

export default productRouter;
