const express = require("express");

const router = express.Router({ mergeParams: true });

router.use("/", require("./auth"));
router.use("/post", require("./post"));
router.use("/user", require("./user"));

module.exports = router;
