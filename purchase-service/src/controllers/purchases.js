const getAllPurchases = (req, res) => {
    res.send('this is get all purchases');
};
const getPurchaseById = (req, res) => {
    res.send('this is get purchase by id');
};
const createPurchase = (req, res) => {
    res.send('this is create purchase');
};
const updatePurchaseById = (req, res) => {
    res.send('this is update  purchase');
};
const deletePurchaseById = (req, res) => {
    res.send('this is delete purchase');
};

export default {
    getAllPurchases,
    getPurchaseById,
    createPurchase,
    updatePurchaseById,
    deletePurchaseById,
};
