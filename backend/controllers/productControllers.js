const Product = require("../models/productModel");
const mongoose = require("mongoose");

//GET / products;
const getAllProducts = async (req, res) => {
  try {
    const items = await Product.find({}).sort({createdAt: -1})
    res.status(200).json(items)
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve items!"})
  }
};

// POST /products
const createProduct = async (req, res) => {
  try {
    const newItem = await Product.create({...req.body});
    res.status(201).json(newItem)
  } catch (err) {
    res.status(400)
    .json({ message: "Failed to create new item", error: err.message});
  }
};

// GET /products/:productId
const getProductById = async (req, res) => {
  const {itemId} = req.params

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(400).json({message: "Item id not valid"})
  }

  try {
    const item = await Product.findById(itemId)
    if (item) {
      res.status(200).json(item)
    } else {
      res.status(404).json({message: "Could not find product"})
    }
  } catch (err) {
    res.status(500).json({ message: "Error finding product", error: err.message})
  }
};

// PUT /products/:productId
const updateProduct = async (req, res) => {
  const {itemId} = req.params

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(400).json({message: "Item id not valid"})
  }

  try {
    const updatedItem = await Product.findByIdAndUpdate(
                                              {_id: itemId}, 
                                              {...req.body}, 
                                              {new: true});
    if (updatedItem) {
      res.status(200).json(updatedItem)
    } else {
      res.status(404).json({message: "Could not update item"})
    }
  } catch (err) {
    res.status(500).json({message: "Error while updating item", error: err.message})
  }
};

// DELETE /products/:productId
const deleteProduct = async (req, res) => {
  const {itemId} = req.params

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(400).json({message: "Item id not valid"})
  }

  try {
    const deletedItem = await Product.findByIdAndDelete({_id: itemId})

    if (deletedItem) {
      res.status(204).send()
    } else {
      res.status(404).json({message: "Could not delete item"})
    }
  } catch (err) {
    res.status(500).json({message: "Error while deleting item", error: err.message})
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
