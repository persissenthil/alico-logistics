import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("Admin123!", 12);

  const admin = await prisma.admin.upsert({
    where: {
      email: "admin@alicologistics.com",
    },
    update: {
      name: "Alico Admin",
      password: hashedPassword,
    },
    create: {
      name: "Alico Admin",
      email: "admin@alicologistics.com",
      password: hashedPassword,
    },
  });

  console.log(`Admin created: ${admin.email}`);
}

main()
  .catch((error) => {
    console.error("Seed error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });