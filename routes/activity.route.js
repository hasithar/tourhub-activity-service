var express = require("express");
var router = express.Router();
const {
  getAllActivities,
  getActivity,
  createActivity,
  updateActivity,
  deleteActivity,
} = require("../controllers/activity.controller");

// get all items
router.get("/", getAllActivities);

// get single item
router.get("/:id", getActivity);

// create item
router.post("/", createActivity);

// update item
router.patch("/:id", updateActivity);

// delete item
router.delete("/:id", deleteActivity);

module.exports = router;
