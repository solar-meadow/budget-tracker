import { Mongoose } from 'mongoose';
import ProductModel from '../models/product_model.js';

const getProducts = async (req, res) => {
    const products = await ProductModel.find({ is_deleted: false });
    res.send(products);
};
const createProduct = async (req, res) => {
    console.log(req.body);
    const doc = new ProductModel({
        product_name: req.body.product_name,
        description: req.body.description,
    });

    try {
        const product = await doc.save();
        res.json(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};
const updateProduct = async (req, res) => {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
        res.status(400);
        throw new Error('Bad request');
    }
    try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
    res.sendStatus(200);
};
const deleteProduct = async (req, res) => {
    const product = await ProductModel.findById(req.params.id)
        .where('is_deleted')
        .equals(false);
    if (!product) {
        res.status(400);
        throw new Error('Bad request');
    }
    try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            req.params.id,
            {
                is_deleted: true,
            },
            {
                new: true,
            }
        );
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
    res.sendStatus(200);
};
const getProductById = async (req, res) => {
    const product = await ProductModel.findById(req.params.id)
        .where('is_deleted')
        .equals(false);
    if (!product) {
        res.sendStatus(404);
    } else {
        res.send(product);
    }
};

export {
    getProductById,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
};
