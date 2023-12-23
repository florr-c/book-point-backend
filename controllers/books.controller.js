const { connectDb } = require("../database");

const getBooks = async (req, res) => {
  const db = await connectDb();
  const books = await db.collection("books").find().toArray();

  res.json(books);
};

const getBookPrices = async (req, res) => {
  const db = await connectDb();
  const books = await db.collection("book-prices").find().toArray();
  res.json(books);
};

module.exports = {
  getBooks,
  getBookPrices,
};
