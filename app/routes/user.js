import express from "express";
import { signup, login } from "../controllers/user.js";

const router = express();

router.post("/signup", signup);
router.post("/login", login);

export default router;
