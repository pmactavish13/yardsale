const router = require("express").Router();
const productsController = require("../../controllers/productsController");

// // Matches with "/api/products"
// router.route("/")
//   .get(productsController.findAll);

// Create a new product listing equiv of api/products/newProduct*********************change\

// ****************************************************************************************
router.route("/signup")  
  .post(productsController.create);

  router.route("/signin")  
  .post(productsController.create);

  router.route("/signup")  
  .post(productsController.create);

// Matches with "/api/products/:id"
router
  .route("/:id")
  .get(productsController.findById)
  .put(productsController.update)
  .delete(productsController.remove);

module.exports = router; 