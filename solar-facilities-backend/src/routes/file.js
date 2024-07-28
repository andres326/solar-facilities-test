import express from "express";
import { saveFileData } from "../controllers/file.js";
import uploadFile from "../middlewares/upload-file.js";

const router = express.Router();

router.post("/file", uploadFile.single("file"), saveFileData);

export { router as saveFileRouter };
