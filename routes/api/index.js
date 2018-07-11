const router = require("express").Router();
const memberRoutes = require("./members");
const productRoutes = require("./products");
const accountRoutes = require("./account");
const noteRoutes = require("./notes")

// Member routes
router.use("/members", memberRoutes);

// Product routes
router.use("/products", productRoutes);

// Product routes
router.use("/notes", noteRoutes);

// Product routes
router.use("/account", accountRoutes);

module.exports = router;
