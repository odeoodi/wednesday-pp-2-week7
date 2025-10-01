const express = require("express");
const auth = require('../middleware/requireAuth');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControllers");

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:itemId", getProductById);
router.use(auth);
router.post("/", createProduct);


router.put("/:itemId", updateProduct);
router.delete("/:itemId", deleteProduct);

module.exports = router;
