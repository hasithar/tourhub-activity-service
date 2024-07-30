import request from "supertest";
import { expect } from "chai";
import app from "../app.js";
import mongoose from "mongoose";
import Activity from "../models/activity.model.js";
import { connectTestDB, closeTestDB, clearTestDB } from "./testHelper.mjs";

describe("Activity Endpoints", () => {
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

  // test POST /activities endpoint
  describe("POST /activities", () => {
    it("should create a new activity", async () => {
      const res = await request(app).post("/activities").send({
        name: "Sample Activity",
        category: new mongoose.Types.ObjectId(),
        description: "Sample activity description",
      });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("name", "Sample Activity");
      expect(res.body).to.have.property(
        "description",
        "Sample activity description"
      );
    });

    it("should not create a activity with an existing name", async () => {
      await new Activity({
        name: "Sample Activity",
        category: new mongoose.Types.ObjectId(),
        description: "Sample activity description",
      }).save();

      const res = await request(app).post("/activities").send({
        name: "Sample Activity",
        category: new mongoose.Types.ObjectId(),
        description: "Sample activity description",
      });

      expect(res.status).to.equal(500);
      expect(res.body).to.have.property("message");
    });
  });

  // test GET /activities endpoint
  describe("GET /activities", () => {
    it("should fetch all activities", async () => {
      await new Activity({
        name: "Sample Activity",
        category: new mongoose.Types.ObjectId(),
        description: "Sample activity description",
      }).save();
      await new Activity({
        name: "Sample Activity 2",
        category: new mongoose.Types.ObjectId(),
        description: "Sample activity 2 description",
      }).save();

      const res = await request(app).get("/activities");

      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(2);
    });
  });

  // test GET /activities/:id endpoint
  describe("GET /activities/:id", () => {
    it("should fetch a activity by ID", async () => {
      const activity = await new Activity({
        name: "Sample Activity",
        category: new mongoose.Types.ObjectId(),
        description: "Sample activity description",
      }).save();

      const res = await request(app).get(`/activities/${activity._id}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("name", "Sample Activity");
      expect(res.body).to.have.property(
        "description",
        "Sample activity description"
      );
    });

    it("should return 404 if activity not found", async () => {
      const nonExistentActivityId = new mongoose.Types.ObjectId();
      const res = await request(app).get(
        `/activities/${nonExistentActivityId}`
      );

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("message", "Activity not found.");
    });
  });

  // test PATCH /activities/:id endpoint
  describe("PATCH /activities/:id", () => {
    it("should update a activity", async () => {
      const activity = await new Activity({
        name: "Sample Activity",
        category: new mongoose.Types.ObjectId(),
        description: "Sample activity description",
      }).save();

      const res = await request(app)
        .patch(`/activities/${activity._id}`)
        .send({ description: "Sample activity updated description" });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property(
        "description",
        "Sample activity updated description"
      );
    });

    it("should return 404 if activity not found", async () => {
      const nonExistentActivityId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .patch(`/activities/${nonExistentActivityId}`)
        .send({ description: "Sample activity updated description" });

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("message", "Activity not found.");
    });
  });

  // test DELETE /activities/:id endpoint
  describe("DELETE /activities/:id", () => {
    it("should delete a activity", async () => {
      const activity = await new Activity({
        name: "Sample Activity",
        category: new mongoose.Types.ObjectId(),
        description: "Sample activity description",
      }).save();

      const res = await request(app).delete(`/activities/${activity._id}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property(
        "message",
        "Activity deleted successfully."
      );

      const deletedActivity = await Activity.findById(activity._id);
      expect(deletedActivity).to.be.null;
    });

    it("should return 404 if activity not found", async () => {
      const nonExistentActivityId = new mongoose.Types.ObjectId();
      const res = await request(app).delete(
        `/activities/${nonExistentActivityId}`
      );

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("message", "Activity not found.");
    });
  });
});
