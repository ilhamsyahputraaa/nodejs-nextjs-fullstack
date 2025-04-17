// prisma/seed.ts
import { PrismaClient, UserRole, TaskStatus } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

const images = [
  "https://www.snaply.id/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1506794778202-cad84cf45f1d%3Fw%3D800%26auto%3Dformat%26fit%3Dcrop%26q%3D60%26ixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxzZWFyY2h8Nnx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%253D&w=640&q=75",
  "https://www.snaply.id/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1671016233730-44258a88eb03%3Fq%3D80%26w%3D2866%26auto%3Dformat%26fit%3Dcrop%26ixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D&w=640&q=75",
  "https://www.snaply.id/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1489980557514-251d61e3eeb6%3Fq%3D80%26w%3D2940%26auto%3Dformat%26fit%3Dcrop%26ixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D&w=640&q=75",
  "https://www.snaply.id/_next/image?url=https%3A%2F%2Fplus.unsplash.com%2Fpremium_photo-1689977968861-9c91dbb16049%3Fq%3D80%26w%3D2940%26auto%3Dformat%26fit%3Dcrop%26ixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D&w=640&q=75",
  "https://www.snaply.id/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1602233158242-3ba0ac4d2167%3Fq%3D80%26w%3D2836%26auto%3Dformat%26fit%3Dcrop%26ixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D&w=640&q=75",
  "https://www.snaply.id/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1586196877083-6a4e8a995cf1%3Fw%3D800%26auto%3Dformat%26fit%3Dcrop%26q%3D60%26ixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y3Jpc3RpYW5vJTIwcm9uYWxkb3xlbnwwfHwwfHx8MA%253D%253D&w=640&q=75",
  "https://www.snaply.id/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1521119989659-a83eee488004%3Fw%3D800%26auto%3Dformat%26fit%3Dcrop%26q%3D60%26ixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxzZWFyY2h8N3x8cG9ydHJhaXR8ZW58MHx8MHx8fDA%253D&w=640&q=75",
  "https://www.snaply.id/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1489980557514-251d61e3eeb6%3Fq%3D80%26w%3D2940%26auto%3Dformat%26fit%3Dcrop%26ixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D&w=640&q=75",
  "https://www.snaply.id/_next/image?url=https%3A%2F%2Fplus.unsplash.com%2Fpremium_photo-1689977968861-9c91dbb16049%3Fq%3D80%26w%3D2940%26auto%3Dformat%26fit%3Dcrop%26ixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D&w=640&q=75",
  "https://www.snaply.id/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1628015081036-0747ec8f077a%3Fq%3D80%26w%3D2930%26auto%3Dformat%26fit%3Dcrop%26ixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D&w=640&q=75",
];
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
          role: `${i % 2 === 0 ? "MEMBER" : "ADMIN"}`,
          image: images[i % images.length],
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
          credit: Math.floor(Math.random() * 100) + 1,
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
