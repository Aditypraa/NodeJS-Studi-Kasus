const { productRef } = require("../../db/firebase");

class ProductControllerApi {
  static getProduct = async (req, res) => {
    try {
      const snapshot = await productRef.get();
      const products = [];
      snapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });

      // Ganti res.render dengan res.json
      res.json({
        message: "Product get all successfully",
        products,
      });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  };
  static getProductById = async (req, res) => {
    try {
      const productId = req.params.id; // Assumes ID is in a parameter named "id"

      const docSnapshot = await productRef.doc(productId).get();

      if (!docSnapshot.exists) {
        res
          .status(404)
          .json({ message: `Product with ID ${productId} not found` });
        return;
      }

      const productData = docSnapshot.data();
      const product = { id: productId, ...productData };

      res.json({ message: "Product retrieved successfully", product });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  };
}

module.exports = ProductControllerApi;
