import fs from "fs";
import multer from "multer";
import { CSV_PATH } from "../utils/constants.js";

const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    const dir = CSV_PATH;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    cb(null, file.originalname);
  },
});

const csvFilter = (_req, file, cb) => {
  if (file == undefined) {
    cb("There is no file to read", false);
  } else if (file.mimetype.includes("csv")) {
    cb(null, true);
  } else {
    cb("Only CSV files supported", false);
  }
};

export default multer({
  storage,
  fileFilter: csvFilter,
});
