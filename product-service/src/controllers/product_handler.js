const getProducts = (req, res) => {
    res.send('get all products handler');
};
const createProduct = (req, res) => {
    res.send('create product handler');
};
const updateProduct = (req, res) => {
    res.send('update product handler');
};
const deleteProduct = (req, res) => {
    res.send('delete product handler');
};
const getProductById = (req, res) => {
    res.send('get product by id handler');
};

export {
    getProductById,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
};
