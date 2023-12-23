const express = require("express");
const BooksController = require("../controllers/books.controller");

const router = express.Router({ mergeParams: true });

router.route("/").get(BooksController.getBooks);
router.route("/prices").get(BooksController.getBookPrices);

module.exports = router;
