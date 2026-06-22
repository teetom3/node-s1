import express from "express";
const router = express();
import userRoutes from "./user.js";
import woodRoutes from "./wood.js";

router.use("/woods", woodRoutes);
router.use("/auth", userRoutes);

export default router;
