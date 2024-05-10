import PurchaseModel from "../models/purchase.js";

const getAllPurchases = async (req, res) => {
  const { userId } = req.query;
  if (userId) {
    const myDebts = getPurchasesByUserId(res, userId);
    return;
  }

  const purchases = await PurchaseModel.find({ isDeleted: false });
  if (!purchases) {
    res.sendStatus(404);
  }

  res.send(purchases);
};

const getPurchaseById = async (req, res) => {
  const purchase = await PurchaseModel.findById(req.params.id);
  if (!purchase) {
    res.sendStatus(404);
  }
  res.send(purchase);
};

const getPurchasesByUserId = async (res, userId) => {
  const purchases = await PurchaseModel.find({ isDeleted: false });
  const myDebts = purchases?.filter((purchase) =>
    purchase.debtors.find((debt) => debt.user_id === userId)
  );
  if (!myDebts.length) {
    return res.sendStatus(404);
  }
  res.send(myDebts);
};

const createPurchase = async (req, res) => {
  const products = req.body.products.map((product) => ({
    product_id: product.product_id,
    price: product.price,
    quantity: product.quantity,
  }));

  const debtors = req.body.debtors.map((debtor) => ({
    user_id: debtor.user_id,
  }));

  const doc = new PurchaseModel({
    products: products,
    debtors: debtors,
    user_id: req.body.user_id,
  });
  try {
    const purchase = await doc.save();
    res.status(200);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
    return;
  }
  res.sendStatus(200);
};
const updatePurchaseById = async (req, res) => {
  const purchase = await PurchaseModel.findById(req.params.id);
  if (!purchase) {
    res.sendStatus(404);
  }
  try {
    const products = req.body.products.map((product) => ({
      product_id: product.product_id,
      price: product.price,
      quantity: product.quantity,
    }));
    const updatedPurchase = await PurchaseModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500);
    return;
  }
  res.sendStatus(200);
};
const deletePurchaseById = async (req, res) => {
  const purchase = await PurchaseModel.findById(req.params.id);
  if (!purchase) {
    res.sendStatus(404);
  }
  try {
    const updatedPurchase = await PurchaseModel.findByIdAndUpdate(
      req.params.id,
      {
        isDeleted: true,
      },
      {
        new: true,
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500);
    return;
  }
  res.sendStatus(200);
};

export default {
  getAllPurchases,
  getPurchaseById,
  createPurchase,
  updatePurchaseById,
  deletePurchaseById,
};
