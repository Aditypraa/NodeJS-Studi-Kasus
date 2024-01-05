const express = require("express");
const ProductControllerApi = require("../../controllers/api/Product.controller");
const router = express.Router();

router.get("/", ProductControllerApi.getProduct);
router.get("/:id", ProductControllerApi.getProductById);

module.exports = router;
