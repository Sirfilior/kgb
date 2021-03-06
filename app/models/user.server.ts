import type {
  Password,
  User,
  Kirchgemeinde,
  Gottesdienst,
} from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";

export type { User, Gottesdienst } from "@prisma/client";

export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser(email: User["email"], password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });
}

export async function setUserKirchgemeinde(id: User["id"], ids: string[]) {
  return prisma.user.update({
    where: { id },
    data: {
      kirchgemeinden: {
        connect: ids.map((kirchgemeindeId) => ({
          id: kirchgemeindeId,
        })),
      },
    },
  });
}

export async function joinGottesdienst(
  id: User["id"],
  gid: Gottesdienst["id"]
) {
  console.log("a");
  return prisma.user.update({
    where: { id },
    data: {
      joinedGottesdienste: {
        connect: { id: gid },
      },
    },
  });
}

export async function verifyLogin(
  email: User["email"],
  password: Password["hash"]
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash
  );

  if (!isValid) {
    return null;
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}
