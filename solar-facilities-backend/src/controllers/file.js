import { createReadStream } from "fs";
import { unlink } from "fs/promises";
import { parse } from "fast-csv";
import jwt from "jsonwebtoken";
import { CSV_PATH } from "../utils/constants.js";
import { PerformanceModel } from "../model/performance.js";

export const saveFileData = (req, res) => {
  try {
    const authToken = req?.headers?.authorization;
    if (!authToken) {
      return res.status(400).send({ message: "Unauthorized" });
    }

    const token = authToken.includes("Bearer")
      ? authToken.split(" ")[1]
      : authToken;
    const userData = jwt.verify(token, process.env.JWT_KEY);
    if (!userData) {
      return res.status(400).send({ message: "Unauthorized" });
    }

    if (!req.file) {
      return res.status(400).send({ message: "Please upload a CSV file!" });
    }

    const { facilityId } = req.body;

    let performanceData = [];
    const path = `${CSV_PATH}/${req.file.filename}`;

    createReadStream(path)
      .pipe(
        parse({
          headers: ["timestamp", "activePower", "energy"],
          renameHeaders: true,
        }),
      )
      .on("error", (error) => {
        throw error.message;
      })
      .on("data", (row) => {
        const { timestamp, activePower, energy } = row;
        performanceData.push({ timestamp, activePower, energy, facilityId });
      })
      .on("end", async () => {
        await PerformanceModel.insertMany(performanceData);
        await unlink(path);
        res.status(200).send({
          message:
            "The file: " +
            req.file.originalname +
            " got uploaded successfully!!",
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Failed to upload the file: " + req.file.originalname,
    });
  } finally {
  }
};
