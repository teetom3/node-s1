import express from "express";
import { findAll, findByHardness } from "../controllers/wood.js";
import auth from "../middlewares/auth.js";
const router = express();

router.get("/", auth, findAll);
router.get("/hardness/:hardness", auth, findByHardness);

export default router;
