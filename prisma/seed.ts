import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const databaseUrl = new URL(process.env.DATABASE_URL as string);
const adapter = new PrismaMariaDb({
  host: databaseUrl.hostname,
  port: Number(databaseUrl.port || 3306),
  user: databaseUrl.username,
  password: decodeURIComponent(databaseUrl.password),
  database: databaseUrl.pathname.replace("/", ""),
});

const prisma = new PrismaClient({ adapter });

const woods = [
  { name: "Épicéa", type: "softwood", hardness: "tender" },
  { name: "Pin", type: "softwood", hardness: "medium_hard" },
  { name: "Padouk", type: "exotic_wood", hardness: "hard" },
  { name: "Érable", type: "noble_and_hardwoods", hardness: "medium_hard" },
  { name: "Hêtre", type: "noble_and_hardwoods", hardness: "medium_hard" },
  { name: "Itauba", type: "exotic_wood", hardness: "hard" },
  { name: "Douglas", type: "softwood", hardness: "tender" },
] as const;

async function main() {
  console.log("Seed");

  for (const wood of woods) {
    await prisma.wood.upsert({
      where: { name: wood.name },
      update: { type: wood.type, hardness: wood.hardness },
      create: wood,
    });
  }
  console.log(`Seeded ${woods.length} woods.`);

  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      firstName: "Admin",
      lastName: "User",
      email: "admin@example.com",
      password: "admin123", 
    },
  });
  console.log("Seeded 1 user.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seeding complete.");
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
