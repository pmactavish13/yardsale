const router = require("express").Router();
const membersController = require("../../controllers/membersController");

// Matches with "/api/members"
router.route("/")
  // .get(membersController.findAll)
  .post(membersController.create);

// Matches with "/api/members/:id"
router
  .route("/:id")
  .get(membersController.findById)
  .put(membersController.update)
  // .put(membersController.findOneAndUpdate)
  .delete(membersController.remove);

// // Matches with "/api/members/auth"
// router.route("/auth")
//   // .get(membersController.findAll)
//   .get(membersController.findByAuth)

// Matches with "/api/members/auth"
router.route("/auth")
  // .get(membersController.findAll)
  .post(membersController.findByAuth)

module.exports = router;