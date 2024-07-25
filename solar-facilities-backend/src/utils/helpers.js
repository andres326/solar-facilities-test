import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

export function __dirname(url) {
  return dirname(fileURLToPath(url));
}

export const FACILITY_STATUS = {
  DELETED: "deleted",
  ENABLED: "enabled",
};
