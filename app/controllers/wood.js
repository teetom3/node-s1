import { prisma } from "../../app.js";

export async function create(req, res) {
  try {
    const pathname = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    const wood = await prisma.wood.create({
      data: {
        ...JSON.parse(req.body.datas),
        image: pathname,
      },
    });
    res.status(201).json(wood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
}

export async function findAll(req, res) {
  try {
    const woods = await prisma.wood.findMany();
    res.json(woods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
}

export async function findByHardness(req, res) {
  const { hardness } = req.params;
  try {
    const woods = await prisma.wood.findMany({
      where: { hardness: hardness },
    });
    res.json(woods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
}
