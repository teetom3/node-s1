import express from "express";
import { woods } from "../controllers/wood.js";

const router = express();

router.get("/", woods);

export default router;
