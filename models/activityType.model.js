const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define activity type schema
const activityTypeSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: String,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

activityTypeSchema.index({ name: 1 }, { unique: true });

const ActivityType = mongoose.model("ActivityType", activityTypeSchema);

module.exports = ActivityType;
