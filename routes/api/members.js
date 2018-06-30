const router = require("express").Router();
const membersController = require("../../controllers/membersController");

// Matches with "/api/members"
router.route("/members")
  .get(membersController.findAll)
  .post(membersController.create);

// Matches with "/api/members/:id"
router
  .route("/member/:id")
  .get(membersController.findById)
  .put(membersController.update)
  .delete(membersController.remove);

module.exports = router;