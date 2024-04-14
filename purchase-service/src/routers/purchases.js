import express from 'express';
import purchaseController from '../controllers/purchases.js';
const purchaseRouter = express.Router();

purchaseRouter.get('/', purchaseController.getAllPurchases);
purchaseRouter.get('/:id', purchaseController.getPurchaseById);
purchaseRouter.post('/create', purchaseController.createPurchase);
purchaseRouter.put('/update/:id', purchaseController.updatePurchaseById);
purchaseRouter.delete('/delete/:id', purchaseController.deletePurchaseById);

export default purchaseRouter;
