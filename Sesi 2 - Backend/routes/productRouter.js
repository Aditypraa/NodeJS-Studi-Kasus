const express = require("express");
const ProductController = require("../controllers/ProductController");
const router = express.Router();

router.get("/", ProductController.getProduct);
router.get("/add", ProductController.addProductPage);
router.post("/", ProductController.addProduct);
router.get("/edit/:id", ProductController.editProduct);
router.post("/update/:id", ProductController.updateProduct);
router.post("/delete/:id", ProductController.deleteProduct);

module.exports = router;
