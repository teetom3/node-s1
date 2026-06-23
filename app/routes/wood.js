import express from "express";
import { findAll, findByHardness } from "../controllers/wood.js";

const router = express();

router.get("/", findAll);
router.get("/hardness/:hardness", findByHardness);

export default router;
