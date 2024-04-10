import { prisma } from "../config/prisma.connect";

export default async function _isUserAvailable(email) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { management: true, personnel: true, admin: true },
    });
    return !!user;
  } catch (error) {
    throw new Error(error);
  }
}
