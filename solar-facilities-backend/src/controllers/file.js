import { createReadStream } from "fs";
import { unlink } from "fs/promises";
import { parse } from "fast-csv";
import { CSV_PATH } from "../utils/constants.js";
import { PerformanceModel } from "../model/performance-data.js";

export const saveFileData = (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload a CSV file!");
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
