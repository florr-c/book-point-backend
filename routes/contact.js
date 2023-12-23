const express = require("express");
const contactController = require("../controllers/contact.controller");

const router = express.Router({ mergeParams: true });

router.route("/").post(contactController.insertContact);
router.route("/delete").post(contactController.deleteContact);
router.route("/update").post(contactController.updateContact);
router.route("/").get(contactController.readContact);


module.exports = router;

