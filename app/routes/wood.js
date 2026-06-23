import express from "express";
import { findAll, findByHardness, create } from "../controllers/wood.js";
import auth from "../middlewares/auth.js";
import multer from "../middlewares/multer.js";

const router = express();

router.post("/", auth, multer, create);
router.get("/", auth, findAll);
router.get("/hardness/:hardness", auth, findByHardness);

export default router;
