import { prisma } from "../../app.js";

function addLinks(wood, req) {
  const base = `${req.protocol}://${req.get("host")}/api/woods`;
  return {
    ...wood,
    links: {
      self: `${base}/${wood.id}`,
      sameHardness: `${base}/hardness/${wood.hardness}`,
    },
  };
}

export async function create(req, res) {
  try {
    const pathname = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    const wood = await prisma.wood.create({
      data: {
        ...JSON.parse(req.body.datas),
        image: pathname,
      },
    });
    res.status(201).json(addLinks(wood, req));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
}

export async function findAll(req, res) {
  try {
    const woods = await prisma.wood.findMany();
    res.json(woods.map((wood) => addLinks(wood, req)));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
}

export async function findByHardness(req, res) {
  const { hardness } = req.params;
  try {
    const woods = await prisma.wood.findMany({
      where: { hardness },
    });
    res.json(woods.map((wood) => addLinks(wood, req)));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
}
