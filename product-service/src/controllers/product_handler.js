import { Mongoose } from 'mongoose'
import ProductModel from '../models/product_model.js'

const getProducts = async (req, res) => {
  const products = await ProductModel.find({ is_deleted: false })
  res.send(products)
}

const createProduct = async (req, res) => {
  if (!req.body?.length) {
    return res.status(400).json({ message: 'Empty request body' })
  }
  try {
    const results = []
    for (const product of req.body) {
      // check product_name exist
      validateProduct(product)

      const exist = await getProductByName(product.product_name)
      if (exist) {
        const error = new Error(
          `Product name ${product.product_name} already exists`
        )

        error.code = 400
        throw error
      }

      const doc = new ProductModel({
        product_name: product.product_name,
        description: product?.description
      })
      const savedProduct = await doc.save()
      results.push(savedProduct)
    }
    return res.status(200).json({ results })
  } catch (err) {
    const statusCode = err.code || 500
    return res.status(statusCode).json({ message: err.message })
  }
}

const updateProduct = async (req, res) => {
  const product = await ProductModel.findById(req.params.id)
  if (!product) {
    res.status(400)
    throw new Error('Bad request')
  }
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    )
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
  res.sendStatus(200)
}
const deleteProduct = async (req, res) => {
  const product = await ProductModel.findById(req.params.id)
    .where('is_deleted')
    .equals(false)
  if (!product) {
    res.status(400)
    throw new Error('Bad request')
  }
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      {
        is_deleted: true
      },
      {
        new: true
      }
    )
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
  res.sendStatus(200)
}
const getProductById = async (req, res) => {
  const product = await ProductModel.findById(req.params.id)
    .where('is_deleted')
    .equals(false)
  if (!product) {
    res.sendStatus(404)
  } else {
    res.send(product)
  }
}

const getProductByName = async (name) => {
  try {
    const product = await ProductModel.findOne({ product_name: name })
    return product
  } catch (err) {
    console.error(err)
  }
}

const validateProduct = (product) => {
  if (!product?.product_name) {
    throw new Error('need property in json object product_name')
  }
}

export {
  getProductById,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
}
