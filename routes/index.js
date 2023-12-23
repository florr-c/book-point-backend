const express = require("express");

const booksRouter = require("./books");
const contactRouter = require("./contact");
const userRouter = require("./user");
const authRouter = require("./auth");

const router = express.Router();

router.use("/books", booksRouter);
router.use("/contact", contactRouter);
router.use("/user", userRouter);
router.use("/auth", authRouter);

module.exports = router;
