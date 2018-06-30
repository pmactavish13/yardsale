const router = require("express").Router();
const memberRoutes = require("./members");
const productRoutes = require("./products");

// Member routes
router.use("/members", memberRoutes);

// Product routes
router.use("/products", productRoutes);

module.exports = router;
