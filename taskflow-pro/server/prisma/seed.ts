// prisma/seed.ts
import { PrismaClient, UserRole, TaskStatus } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Create 5 users
  const users = await Promise.all(
    Array.from({ length: 15 }).map(async (_, i) =>
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

  // Create 5 divisions
  const divisions = await Promise.all(
    Array.from({ length: 15 }).map((_, i) =>
      prisma.division.create({
        data: {
          id: `${i}`,
          name: `Division ${i}`,
        },
      })
    )
  );

  // Create 5 division members (AFTER divisions created)
  const divisionMembers = await Promise.all(
    Array.from({ length: 15 }).map((_, i) =>
      prisma.divisionMember.create({
        data: {
          id: `${i}`,
          userId: users[i].id,
          divisionId: divisions[i].id,
          role: UserRole.MEMBER,
        },
      })
    )
  );

  // Create 5 projects
  const projects = await Promise.all(
    Array.from({ length: 15 }).map((_, i) =>
      prisma.project.create({
        data: {
          id: `${i}`,
          name: `Project ${i}`,
          ownerId: users[i].id,
          divisionId: divisions[i].id,
        },
      })
    )
  );

  // Create 5 tasks
  await Promise.all(
    Array.from({ length: 15 }).map((_, i) =>
      prisma.task.create({
        data: {
          id: `${i}`,
          title: `Task ${i}`,
          description: `This is task ${i}`,
          dueDate: new Date(Date.now() + i * 86400000),
          assignedToId: users[i].id,
          projectId: projects[i].id,
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
