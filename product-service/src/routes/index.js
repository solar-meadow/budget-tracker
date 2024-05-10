import express from 'express'
import productRouter from './product_router.js'

const router = express.Router()

router.use('/products', productRouter)

export default router
