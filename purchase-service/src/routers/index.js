import express from 'express';
import purchaseRouter from './purchases.js';

const router = express.Router();
router.use('/purchases', purchaseRouter);

export default router;
