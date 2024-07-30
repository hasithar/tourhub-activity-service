const ActivityType = require("../models/activityType.model");

/* get all items
 *--------------------------------------------- */
const getAllActivityTypes = async (req, res) => {
  try {
    const activityTypes = await ActivityType.find({});
    res.status(200).json(activityTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* get single item
 *--------------------------------------------- */
const getActivityType = async (req, res) => {
  try {
    const { id } = req.params;
    const activityType = await ActivityType.findById(id);
    if (!activityType) {
      return res.status(404).json({ message: "Activity Type not found." });
    }
    res.status(200).json(activityType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* create item
 *--------------------------------------------- */
const createActivityType = async (req, res) => {
  try {
    const activityType = await ActivityType.create(req.body);
    res.status(200).json(activityType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* update item
 *--------------------------------------------- */
const updateActivityType = async (req, res) => {
  try {
    const { id } = req.params;
    const activityType = await ActivityType.findByIdAndUpdate(id, req.body);
    if (!activityType) {
      return res.status(404).json({ message: "Activity Type not found." });
    }
    const updatedActivityType = await ActivityType.findById(id);
    res.status(200).json(updatedActivityType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* delete item
 *--------------------------------------------- */
const deleteActivityType = async (req, res) => {
  try {
    const { id } = req.params;
    const activityType = await ActivityType.findByIdAndDelete(id);
    if (!activityType) {
      return res.status(404).json({ message: "Activity Type not found." });
    }
    res.status(200).json({ message: "Activity Type deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllActivityTypes,
  getActivityType,
  createActivityType,
  updateActivityType,
  deleteActivityType,
};
