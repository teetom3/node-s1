import { prisma } from "../../app.js";

export async function woods(req, res) {
  try {
    const woods = await prisma.wood.findMany();
    res.json(woods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
}
