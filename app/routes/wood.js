import express from "express";
const router = express();

router.get("/woods", function (req, res) {
  res.send("List of woods");
});

export default router;
