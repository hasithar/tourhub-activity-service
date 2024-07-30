import request from "supertest";
import { expect } from "chai";
import app from "../app.js";
import mongoose from "mongoose";
import ActivityType from "../models/activityType.model.js";
import { connectTestDB, closeTestDB, clearTestDB } from "./testHelper.mjs";

describe("Activity Type Endpoints", () => {
  // runs once before all tests
  before(async () => {
    await connectTestDB();
  });

  // runs once after all tests
  after(async () => {
    await closeTestDB();
  });

  // runs before each test
  beforeEach(async () => {
    await clearTestDB();
  });

  // test POST /activity-types endpoint
  describe("POST /activity-types", () => {
    it("should create a new activity type", async () => {
      const res = await request(app).post("/activity-types").send({
        name: "Sample Activity Type",
        description: "Sample activity type description",
      });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("name", "Sample Activity Type");
      expect(res.body).to.have.property(
        "description",
        "Sample activity type description"
      );
    });

    it("should not create a activity type with an existing name", async () => {
      await new ActivityType({
        name: "Sample Activity Type",
        description: "Sample activity type description",
      }).save();

      const res = await request(app).post("/activity-types").send({
        name: "Sample Activity Type",
        description: "Sample activity type description",
      });

      expect(res.status).to.equal(500);
      expect(res.body).to.have.property("message");
    });
  });

  // test GET /activity-types endpoint
  describe("GET /activity-types", () => {
    it("should fetch all activity types", async () => {
      await new ActivityType({
        name: "Sample Activity Type",
        description: "Sample activity type description",
      }).save();
      await new ActivityType({
        name: "Sample Activity Type 2",
        description: "Sample activity type 2 description",
      }).save();

      const res = await request(app).get("/activity-types");

      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(2);
    });
  });

  // test GET /activity-types/:id endpoint
  describe("GET /activity-types/:id", () => {
    it("should fetch a activity type by ID", async () => {
      const activityType = await new ActivityType({
        name: "Sample Activity Type",
        description: "Sample activity type description",
      }).save();

      const res = await request(app).get(`/activity-types/${activityType._id}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("name", "Sample Activity Type");
      expect(res.body).to.have.property(
        "description",
        "Sample activity type description"
      );
    });

    it("should return 404 if activity type not found", async () => {
      const nonExistentActivityTypeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(
        `/activity-types/${nonExistentActivityTypeId}`
      );

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("message", "Activity Type not found.");
    });
  });

  // test PATCH /activity-types/:id endpoint
  describe("PATCH /activity-types/:id", () => {
    it("should update a activity type", async () => {
      const activityType = await new ActivityType({
        name: "Sample Activity Type",
        description: "Sample activity type description",
      }).save();

      const res = await request(app)
        .patch(`/activity-types/${activityType._id}`)
        .send({ description: "Sample activity type updated description" });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property(
        "description",
        "Sample activity type updated description"
      );
    });

    it("should return 404 if activity type not found", async () => {
      const nonExistentActivityTypeId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .patch(`/activity-types/${nonExistentActivityTypeId}`)
        .send({ description: "Sample activity type updated description" });

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("message", "Activity Type not found.");
    });
  });

  // test DELETE /activity-types/:id endpoint
  describe("DELETE /activity-types/:id", () => {
    it("should delete a activity type", async () => {
      const activityType = await new ActivityType({
        name: "Sample Activity Type",
        description: "Sample activity type description",
      }).save();

      const res = await request(app).delete(
        `/activity-types/${activityType._id}`
      );

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property(
        "message",
        "Activity Type deleted successfully."
      );

      const deletedActivityType = await ActivityType.findById(activityType._id);
      expect(deletedActivityType).to.be.null;
    });

    it("should return 404 if activity type not found", async () => {
      const nonExistentActivityTypeId = new mongoose.Types.ObjectId();
      const res = await request(app).delete(
        `/activity-types/${nonExistentActivityTypeId}`
      );

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("message", "Activity Type not found.");
    });
  });
});
