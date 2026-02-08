import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Product from './models/Product.js';
import Order from './models/Order.js';

dotenv.config();

/**
 * Sample users data
 * Includes both regular and admin users
 */
const users = [
  {
    name: 'Admin User',
    email: 'admin@shoplify.com',
    password: 'admin123',
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    isAdmin: false,
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    isAdmin: false,
  },
];

/**
 * Sample products data
 * Various products across different categories
 */
const products = [
  {
    name: 'Wireless Headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    description: 'High-quality wireless headphones with noise cancellation',
    brand: 'AudioTech',
    category: 'Electronics',
    price: 79.99,
    countInStock: 15,
    rating: 4.5,
    numReviews: 25,
  },
  {
    name: 'USB-C Cable',
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500',
    description: 'Durable USB-C charging and data cable',
    brand: 'CablePro',
    category: 'Accessories',
    price: 12.99,
    countInStock: 50,
    rating: 4.8,
    numReviews: 120,
  },
  {
    name: 'Portable Charger',
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500',
    description: 'Fast charging portable power bank',
    brand: 'PowerMax',
    category: 'Electronics',
    price: 34.99,
    countInStock: 30,
    rating: 4.3,
    numReviews: 45,
  },
  {
    name: 'Phone Screen Protector',
    image: 'https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=500',
    description: 'Tempered glass screen protector for smartphones',
    brand: 'ShieldGuard',
    category: 'Accessories',
    price: 9.99,
    countInStock: 100,
    rating: 4.6,
    numReviews: 80,
  },
  {
    name: 'Mechanical Keyboard',
    image: 'https://images.unsplash.com/photo-1587829191301-46f5dae9665e?w=500',
    description: 'RGB mechanical keyboard with custom switches',
    brand: 'KeyMaster',
    category: 'Electronics',
    price: 129.99,
    countInStock: 20,
    rating: 4.9,
    numReviews: 60,
  },
  {
    name: 'Phone Stand',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
    description: 'Adjustable phone stand for desk',
    brand: 'StandPro',
    category: 'Accessories',
    price: 19.99,
    countInStock: 40,
    rating: 4.4,
    numReviews: 35,
  },
];

/**
 * Connect to MongoDB and seed data
 */
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected successfully');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});

    console.log('Cleared existing data');

    // Insert users
    const createdUsers = await User.insertMany(users);
    console.log(`${createdUsers.length} users created`);

    // Insert products
    const createdProducts = await Product.insertMany(products);
    console.log(`${createdProducts.length} products created`);

    console.log('Database seeding completed successfully!');

    process.exit(0);
  } catch (error) {
    console.error(`Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

// Run seeder
seedDatabase();
