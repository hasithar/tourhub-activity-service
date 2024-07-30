const Activity = require("../models/activity.model");
const ActivityType = require("../models/activityType.model");

// sample data
const activities = async (activityTypes) => [
  {
    name: "Mirissa Whale Watching",
    description:
      "Experience the thrill of watching blue whales and dolphins in their natural habitat.",
    location: {
      address: "Mirissa Beach",
      city: "Mirissa",
      province: "Southern",
      country: "Sri Lanka",
      coordinates: {
        type: "Point",
        coordinates: [80.4532, 5.9485],
      },
    },
    category: activityTypes.find((type) => type.name === "Adventure")._id,
    images: [
      "https://example.com/mirissa1.jpg",
      "https://example.com/mirissa2.jpg",
    ],
    contactDetails: {
      phone: "+94 234 567 890",
      email: "info@mirissawhales.com",
      website: "https://www.mirissawhales.com",
    },
  },
  {
    name: "Kandy Cultural Dance Show",
    description:
      "Enjoy traditional Kandyan dance performances showcasing Sri Lankan culture.",
    location: {
      address: "Kandy Lake Club",
      city: "Kandy",
      province: "Central",
      country: "Sri Lanka",
      coordinates: {
        type: "Point",
        coordinates: [80.635, 7.2906],
      },
    },
    category: activityTypes.find((type) => type.name === "Cultural")._id,
    images: [
      "https://example.com/kandy1.jpg",
      "https://example.com/kandy2.jpg",
    ],
    contactDetails: {
      phone: "+94 345 678 901",
      email: "info@kandydance.com",
      website: "https://www.kandydance.com",
    },
  },
  {
    name: "Ella Rock Hike",
    description:
      "A scenic hike to Ella Rock with breathtaking views of the surrounding countryside.",
    location: {
      address: "Ella",
      city: "Ella",
      province: "Uva",
      country: "Sri Lanka",
      coordinates: {
        type: "Point",
        coordinates: [81.0461, 6.8664],
      },
    },
    category: activityTypes.find((type) => type.name === "Adventure")._id,
    images: ["https://example.com/ella1.jpg", "https://example.com/ella2.jpg"],
    contactDetails: {
      phone: "+94 456 789 012",
      email: "info@ellarockhike.com",
      website: "https://www.ellarockhike.com",
    },
  },
  {
    name: "Udawalawe National Park Safari",
    description:
      "A wildlife safari through Udawalawe National Park, famous for its elephant herds.",
    location: {
      address: "Udawalawe National Park",
      city: "Udawalawe",
      province: "Sabaragamuwa",
      country: "Sri Lanka",
      coordinates: {
        type: "Point",
        coordinates: [80.888, 6.475],
      },
    },
    category: activityTypes.find((type) => type.name === "Guided Tour")._id,
    images: [
      "https://example.com/udawalawe1.jpg",
      "https://example.com/udawalawe2.jpg",
    ],
    contactDetails: {
      phone: "+94 678 901 234",
      email: "info@udawalawe.com",
      website: "https://www.udawalawe.com",
    },
  },
  {
    name: "Galle Fort Walking Tour",
    description:
      "A guided walking tour through the historic Galle Fort, a UNESCO World Heritage Site.",
    location: {
      address: "Galle Fort",
      city: "Galle",
      province: "Southern",
      country: "Sri Lanka",
      coordinates: {
        type: "Point",
        coordinates: [80.217, 6.0331],
      },
    },
    category: activityTypes.find((type) => type.name === "Adventure")._id,
    images: [
      "https://example.com/galle1.jpg",
      "https://example.com/galle2.jpg",
    ],
    contactDetails: {
      phone: "+94 789 012 345",
      email: "info@galleforttours.com",
      website: "https://www.galleforttours.com",
    },
  },
];

// seed data
const seedActivities = async () => {
  // delete existing
  await Activity.deleteMany({});

  // get attraction types
  const activitiyTypes = await ActivityType.find();

  // build data with references
  const attractionWithReferences = await activities(activitiyTypes);

  // insert new
  await Activity.insertMany(attractionWithReferences);
};

module.exports = seedActivities;
