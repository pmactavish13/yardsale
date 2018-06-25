const router = require("express").Router();
const memberRoutes = require("./members");

// Member routes
router.use("/members", memberRoutes);

// Product routes
router.use("/productss", productRoutes);

module.exports = router;
