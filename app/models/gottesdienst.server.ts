import type { User, Gottesdienst } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Gottesdienst } from "@prisma/client";

export function getGottesdienst({ id }: Pick<Gottesdienst, "id">) {
  return prisma.gottesdienst.findFirst({
    where: { id },
  });
}

export function getKirchgemeindenList() {
  return prisma.kirchgemeinde.findMany();
}

export function getKirchgemeindenWithGottesdienst() {
  return prisma.kirchgemeinde.findMany({ include: { gottesdienste: true } });
}

export function getKirchgemeindenForUser({ userId }: { userId: User["id"] }) {
  return prisma.kirchgemeinde.findMany({
    where: {
      users: {
        some: {
          id: userId,
        },
      },
    },
  });
}
export function getKirchgemeindenForUserWithGottesdienste(userId: User["id"]) {
  return prisma.kirchgemeinde.findMany({
    where: {
      users: {
        some: {
          id: userId,
        },
      },
    },
    include: { gottesdienste: true },
  });
}
export function getGottesdienstListItems() {
  return prisma.gottesdienst.findMany();
}

export async function getJoinedGottesdienste(userId: User["id"]) {
  return prisma.gottesdienst.findMany({
    where: {
      users: {
        some: {
          id: userId,
        },
      },
    },
  });
}

export async function startGottesdienst(gdId: Gottesdienst["id"]) {
  return prisma.gottesdienst.update({
    where: { id: gdId },
    data: {
      running: true,
    },
  });
}

export function createGottesdienst({
  type,
  date,
  time,
  assignees,
  book,
  music,
  special,
}: Pick<
  Gottesdienst,
  "type" | "date" | "time" | "assignees" | "book" | "music" | "special"
>) {
  return prisma.gottesdienst.create({
    data: {
      type,
      date,
      time,
      title: type,
      assignees,
      book,
      music,
      special,
      liked: false,
      likes: 0,
      entries: 0,
      comments: 0,
      place: "Marienkirche",
      running: false,
      kirchgemeindeId: "1",
    },
  });
}

export function deleteGottesdienst({ id }: Pick<Gottesdienst, "id">) {
  return prisma.gottesdienst.deleteMany({
    where: { id },
  });
}
