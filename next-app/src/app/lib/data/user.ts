import prisma from "@/database/prisma";

export type User = {
  id: number;
  email: string;
  password: string;
  name: string | null;
  role: string;
  profile: Profile | null;
};

export type Profile = {
  id: number;
  bio: string;
};

export async function getUserById(id: string): Promise<User> {
  return await prisma.user.findUniqueOrThrow({
    include: {
      profile: true,
    },
    where: { id: parseInt(id) },
  });
}
