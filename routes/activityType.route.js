var express = require("express");
var router = express.Router();
const {
  getAllActivityTypes,
  getActivityType,
  createActivityType,
  updateActivityType,
  deleteActivityType,
} = require("../controllers/activityType.controller");

// get all items
router.get("/", getAllActivityTypes);

// get single item
router.get("/:id", getActivityType);

// create item
router.post("/", createActivityType);

// update item
router.patch("/:id", updateActivityType);

// delete item
router.delete("/:id", deleteActivityType);

module.exports = router;
