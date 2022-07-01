import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const kirchen = [
  { id: "1", name: "Solothurn" },
  { id: "2", name: "Erlinsbach" },
  { id: "3", name: "Fulenbach" },
  { id: "4", name: "Kienberg" },
  { id: "5", name: "Leimental" },
];

const gottesdienste = [
  {
    date: "Sontag 19. Juni 2022",
    time: "16:00",
    place: "Marienkirche",
    entries: 254,
    title: "Eucharistiefeier",
    running: false,
    type: "Eucharistiefeier",
    assignees: "Martin, Anna, Max",
    book: "Rise up",
    music: "",
    special: "",
    kirchgemeindeId: "1",
    likes: 12,
    liked: true,
    comments: 3,
  },
];

async function seed() {
  // cleanup the existing database
  await prisma.user.deleteMany({});
  await prisma.kirchgemeinde.deleteMany({});
  await prisma.gottesdienst.deleteMany({});

  const email = "info@intersim.ch";
  const hashedPassword = await bcrypt.hash("london1234", 10);

  /*const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });*/

  kirchen.map(async (kirchgemeinde) => {
    await prisma.kirchgemeinde.create({
      data: {
        id: kirchgemeinde.id,
        name: kirchgemeinde.name,
      },
    });
  });

  /*gottesdienste.map(async (gottesdienst) => {
    await prisma.gottesdienst.create({
      data: gottesdienst,
    });
  });*/

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
