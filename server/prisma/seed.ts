import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.todo.deleteMany();

  await prisma.todo.createMany({
    data: [
      { title: "Learn React", completed: true },
      { title: "Build a TODO app", completed: false },
      { title: "Write tests with Jest", completed: false },
    ],
  });

  console.log("Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
