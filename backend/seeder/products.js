import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";

dotenv.config();
const products = [
  // FOOTWEAR
  {
    name: "Puma Running Shoes",
    brand: "Puma",
    price: 3999,
    description: "Lightweight running shoes for daily training",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    category: "Footwear",
    countInStock: 20,
  },
  {
    name: "Adidas Sports Shoes",
    brand: "Adidas",
    price: 4499,
    description: "Comfortable sports shoes with grip sole",
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
    category: "Footwear",
    countInStock: 15,
  },

  // ELECTRONICS
  {
    name: "Boat Rockerz 450",
    brand: "Boat",
    price: 1499,
    description: "Wireless Bluetooth headphones with deep bass",
    image: "https://images.unsplash.com/photo-1580894894513-541e068a3e2b",
    category: "Electronics",
    countInStock: 40,
  },
  {
    name: "Noise ColorFit Pro 4",
    brand: "Noise",
    price: 2999,
    description: "Smartwatch with AMOLED display",
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b",
    category: "Electronics",
    countInStock: 25,
  },
  {
    name: "Realme Buds Air 3",
    brand: "Realme",
    price: 3299,
    description: "True wireless earbuds with ANC",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
    category: "Electronics",
    countInStock: 30,
  },
  {
    name: "Redmi Power Bank 20000mAh",
    brand: "Redmi",
    price: 2199,
    description: "Fast charging power bank",
    image: "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5",
    category: "Electronics",
    countInStock: 50,
  },

  // FASHION
  {
    name: "Roadster Men's Denim Jacket",
    brand: "Roadster",
    price: 2499,
    description: "Stylish casual denim jacket",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    category: "Fashion",
    countInStock: 18,
  },
  {
    name: "Allen Solly Formal Shirt",
    brand: "Allen Solly",
    price: 1999,
    description: "Slim fit cotton formal shirt",
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157",
    category: "Fashion",
    countInStock: 22,
  },
  {
    name: "Biba Women's Kurti",
    brand: "Biba",
    price: 1799,
    description: "Ethnic wear kurti with elegant design",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ffec0f",
    category: "Fashion",
    countInStock: 30,
  },

  // ACCESSORIES
  {
    name: "Titan Analog Watch",
    brand: "Titan",
    price: 5499,
    description: "Classic analog wrist watch",
    image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3",
    category: "Accessories",
    countInStock: 12,
  },
  {
    name: "Fastrack Sunglasses",
    brand: "Fastrack",
    price: 1299,
    description: "UV protected stylish sunglasses",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
    category: "Accessories",
    countInStock: 35,
  },

  // HOME & KITCHEN
  {
    name: "Prestige Pressure Cooker",
    brand: "Prestige",
    price: 2999,
    description: "Aluminium pressure cooker for kitchen",
    image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7",
    category: "Home & Kitchen",
    countInStock: 20,
  },
  {
    name: "Philips Mixer Grinder",
    brand: "Philips",
    price: 3999,
    description: "Powerful mixer grinder for daily use",
    image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2",
    category: "Home & Kitchen",
    countInStock: 15,
  },

  // MOBILE
  {
    name: "Samsung Galaxy M14",
    brand: "Samsung",
    price: 13999,
    description: "5G smartphone with 6000mAh battery",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
    category: "Mobiles",
    countInStock: 10,
  },
  {
    name: "iQOO Z7 5G",
    brand: "iQOO",
    price: 18999,
    description: "High performance gaming smartphone",
    image: "https://images.unsplash.com/photo-1580910051074-7e4c66e1f04d",
    category: "Mobiles",
    countInStock: 8,
  },

  // EXTRA
  {
    name: "Campus Casual Shoes",
    brand: "Campus",
    price: 1999,
    description: "Everyday casual shoes",
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77",
    category: "Footwear",
    countInStock: 25,
  },
  {
    name: "Ustraa Beard Trimmer",
    brand: "Ustraa",
    price: 1299,
    description: "Beard trimmer with adjustable settings",
    image: "https://images.unsplash.com/photo-1621609764095-b32bbe35cf3a",
    category: "Grooming",
    countInStock: 20,
  },
  {
    name: "Mamaearth Face Wash",
    brand: "Mamaearth",
    price: 349,
    description: "Natural face wash with vitamin C",
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd",
    category: "Personal Care",
    countInStock: 50,
  },
];



const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.insertMany(products);

    console.log("✅ Products inserted successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedProducts();
