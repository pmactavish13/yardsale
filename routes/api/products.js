const router = require("express").Router();
const productsController = require("../../controllers/productsController");

// Matches with "/api/products"
router.route("/" || "/products")
  .get(productsController.findAll);

// Create a new product listing
router.route("/newProduct")  
  .post(productsController.create);

// Matches with "/api/products/:id"
router
  .route("/product/:id")
  .get(productsController.findById)
  .put(productsController.update)
  .delete(productsController.remove);

module.exports = router; 