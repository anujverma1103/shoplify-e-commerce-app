import mongoose from 'mongoose';

/**
 * Product Schema
 * Stores product information with ratings and inventory
 */
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
    },
    image: {
      type: String,
      required: [true, 'Please provide a product image'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a product description'],
    },
    brand: {
      type: String,
      required: [true, 'Please provide a brand'],
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
      default: 0,
    },
    countInStock: {
      type: Number,
      required: [true, 'Please provide count in stock'],
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
