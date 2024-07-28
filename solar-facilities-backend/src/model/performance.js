import mongoose from "mongoose";

const PerformanceSchema = new mongoose.Schema({
  timestamp: {
    type: mongoose.Schema.Types.Date,
    required: true,
  },
  activePower: {
    type: Number,
    required: true,
  },
  energy: {
    type: Number,
    required: true,
  },
  facilityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Facility",
  },
});

export const PerformanceModel = mongoose.model(
  "Performance",
  PerformanceSchema,
);
