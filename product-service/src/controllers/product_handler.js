import { Mongoose } from 'mongoose';
import ProductModel from '../models/product_model.js';

const getProducts = async (req, res) => {
    const products = await ProductModel.find({ is_deleted: false });
    res.send(products);
};

const createProduct = async (req, res) => {
    //TODO: СДЕЛАТЬ ПРИЕМ МАССИВА ИЗ ПРОДУКТОВ, ЧТОБЫ ЧЕЛИКИ МОГЛИ ДОБАВЛЯТЬ СРАЗУ НЕСКОЛЬКО ПРОДУКТОВ
    //DONE
    const savedProducts = [];

    try {
        const results = await Promise.all(
            req.body.map(async (product) => {
                const doc = new ProductModel({
                    product_name: product.product_name,
                    description: product.description,
                });

                console.log('test');

                try {
                    const prod = await doc.save();
                    return { product: prod, status: 200, message: 'ok' };
                } catch (err) {
                    console.error(err);
                    return { product: prod, status: 500, message: err };
                }
            })
        );

        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json('An error occurred while saving products');
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
