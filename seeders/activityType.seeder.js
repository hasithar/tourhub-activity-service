const ActivityType = require("../models/activityType.model");

// sample data
const activityTypes = [
  {
    name: "Adventure",
    description:
      "High-energy activities like zip-lining, bungee jumping, and white-water rafting.",
  },
  {
    name: "Cultural",
    description:
      "Activities that involve cultural experiences like visiting historical sites, museums, and attending traditional performances.",
  },
  {
    name: "Guided Tour",
    description:
      "Tours led by a guide, such as city tours, nature walks, and culinary tours.",
  },
  {
    name: "Workshop",
    description:
      "Hands-on learning experiences like cooking classes, art workshops, and craft sessions.",
  },
  {
    name: "Recreational",
    description:
      "Leisure activities such as swimming, hiking, and yoga classes.",
  },
];

// seed data
const seedActivityTypes = async () => {
  // delete existing
  await ActivityType.deleteMany({});
  // insert new
  await ActivityType.insertMany(activityTypes);
};

module.exports = seedActivityTypes;
