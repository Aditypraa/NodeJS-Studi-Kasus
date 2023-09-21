const express = require("express");
const IndexController = require("../controllers/IndexController");
const router = express.Router();

router.get("/", IndexController.getIndexPage);

module.exports = router;
