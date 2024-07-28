import mongoose from "mongoose";
import { FACILITY_STATUS } from "../utils/constants.js";

const FacilitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  power: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(FACILITY_STATUS),
    default: FACILITY_STATUS.ENABLED,
  },
});

export const FacilityModel = mongoose.model("Facility", FacilitySchema);
