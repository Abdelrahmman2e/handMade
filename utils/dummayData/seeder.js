const fs = require("fs");
require("colors");
require("dotenv").config({ path: "../../config.env" });
const dbConn = require("../../config/dbConnection");
const Product = require("../../models/productModel");

dbConn();

const products = JSON.parse(fs.readFileSync("./productData.json"));

const insertData = async () => {
  try {
    await Product.create(products);
    console.log("Data Inserted".green.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    console.log("Data Destroyed".red.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] == "-i") {
  insertData();
} else if (process.argv[2] == "-d") {
  destroyData();
}
