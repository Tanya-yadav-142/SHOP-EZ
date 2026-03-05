const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/products");
const Category = require("./models/categories");

const MONGO_URI = process.env.MONGO_URI;

/* ================= CONNECT DB ================= */
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB atlas Connected"))
  .catch(err => console.log(err));

/* ================= CATEGORY DATA ================= */
const categories = [
  {
    _id: new mongoose.Types.ObjectId("65f100000000000000000001"),
    cName: "Electronics",
    cDescription: "Electronic gadgets",
    cImage: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    cStatus: "Active"
  },
  {
    _id: new mongoose.Types.ObjectId("65f100000000000000000002"),
    cName: "Fashion",
    cDescription: "Fashion products",
    cImage: "https://images.unsplash.com/photo-1445205170230-053b83016050",
    cStatus: "Active"
  },
  {
    _id: new mongoose.Types.ObjectId("65f100000000000000000003"),
    cName: "Home & Living",
    cDescription: "Home essentials",
    cImage: "https://images.unsplash.com/photo-1484101403633-562f891dc89a",
    cStatus: "Active"
  }
];

/* ================= PRODUCT IMAGES ================= */
const images = [
  "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd",
  "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
  "https://images.unsplash.com/photo-1585386959984-a4155224a1ad",
  "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf"
];

/* ================= PRODUCT GENERATOR ================= */
const generateProducts = () => {
  const products = [];

  for (let i = 1; i <= 50; i++) {
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];

    products.push({
      pName: `Demo Product ${i}`,
      pDescription: "High quality demo product for testing ecommerce store.",
      pPrice: Math.floor(Math.random() * 5000) + 500,
      pSold: Math.floor(Math.random() * 20),
      pQuantity: 100,
      pCategory: randomCategory._id,
      pImages: [images[Math.floor(Math.random() * images.length)]],
      pOffer: i % 3 === 0 ? "10% OFF" : null,
      pRatingsReviews: [],
      pStatus: "Active"
    });
  }

  return products;
};

/* ================= SEED FUNCTION ================= */
const seedDB = async () => {
  try {
    console.log("Deleting old data...");
    await Category.deleteMany({});
    await Product.deleteMany({});

    console.log("Adding categories...");
    await Category.insertMany(categories);

    console.log("Adding products...");
    await Product.insertMany(generateProducts());

    console.log("✅ Database Seeded Successfully!");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

seedDB();