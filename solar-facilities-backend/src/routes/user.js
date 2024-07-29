import express from "express";
import { createUser, loginUser } from "../controllers/user.js";

const router = express.Router();

router.post("/signup", createUser);
router.post("/signin", loginUser);

export { router as userRouter };
