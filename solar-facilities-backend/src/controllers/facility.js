import { FacilityModel } from "../model/facility.js";
import { FACILITY_STATUS } from "../utils/constants.js";

export async function getFacility(id) {
  const facility = await FacilityModel.findById(id);
  if (facility && facility.status === FACILITY_STATUS.DELETED) {
    return null;
  }
  return facility;
}

export async function getAllFacilities() {
  return FacilityModel.find({ status: FACILITY_STATUS.ENABLED });
}

export async function createFacility(body) {
  return FacilityModel.create(body);
}

export async function updateFacility(id, body) {
  const facility = await FacilityModel.findById(id);

  if (!facility) return null;

  facility.set({
    ...body,
  });

  return facility.save();
}

export async function deleteFacility(id) {
  const facility = await FacilityModel.findById(id);

  if (!facility) return null;

  facility.set({
    status: FACILITY_STATUS.DELETED,
  });

  return facility.save();
}
