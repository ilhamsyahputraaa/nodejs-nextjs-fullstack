// prisma/seed.ts
import { PrismaClient, UserRole, TaskStatus } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Create 20 users
  const users = await Promise.all(
    Array.from({ length: 20 }).map(async (_, i) =>
      prisma.user.create({
        data: {
          id: `${i}`,
          name: `User ${i}`,
          email: `user${i}@example.com`,
          password: await hash("password", 10),
        },
      })
    )
  );

  // Create 10 divisions
  const divisions = await Promise.all(
    Array.from({ length: 10 }).map((_, i) =>
      prisma.division.create({
        data: {
          id: `${i}`,
          name: `Division ${i}`,
        },
      })
    )
  );

  // Create 2 division members each division (AFTER divisions created)
  await Promise.all(
    Array.from({ length: 20 }).map((_, i) =>
      prisma.divisionMember.create({
        data: {
          id: `${i}`,
          userId: users[i].id,
          divisionId: divisions[i % 10].id, // atau sesuai logika pembagian yang benar
          role: UserRole.MEMBER,
        },
      })
    )
  );

  // Create 20 projects
  const projects = await Promise.all(
    Array.from({ length: 20 }).map((_, i) =>
      prisma.project.create({
        data: {
          id: `${i}`,
          name: `Project ${i}`,
          ownerId: users[i].id,
          divisionId: divisions[i % 2 === 0 ? "1" : "2"].id,
        },
      })
    )
  );

  // Create 100 tasks
  await Promise.all(
    Array.from({ length: 100 }).map((_, i) =>
      prisma.task.create({
        data: {
          id: `${i}`,
          title: `Task ${i}`,
          description: `This is task ${i}`,
          dueDate: new Date(Date.now() + i * 86400000),
          assignedToId: users[Math.floor(i / 5)].id,
          projectId: projects[Math.floor(i / 5)].id,
          status:
            i % 3 === 0
              ? TaskStatus.TODO
              : i % 3 === 1
              ? TaskStatus.IN_PROGRESS
              : TaskStatus.DONE,
        },
      })
    )
  );

  console.log("✅ Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
