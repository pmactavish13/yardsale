const router = require("express").Router();
const accountController = require("../../controllers/accountController");

// // Matches with "/api/products"
// router.route("/")
//   .get(accountController.findAll);

// Create a new product listing equiv of api/products/newProduct*********************change\

// ****************************************************************************************
// router.route("/signup")  
//   .post(accountController.create);

// Matches with "/api/account/signin"
router.route("/signin")
  .post(accountController.signIn);

// Matches with "/api/account/signout"
router.route("/signout")
  .post(accountController.signOut);

// Matches with "/api/account/verify"
router.route("/verify")
  .post(accountController.verify);

// // Matches with "/api/products/:id"
// router
//   .route("/:id")
//   .get(accountController.findById)
//   .put(accountController.update)
//   .delete(accountController.remove);

module.exports = router; 