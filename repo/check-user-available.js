import { prisma } from "../config/prisma.connect";

// check if the user with email is available or not

export default async function _isUserAvailable(email) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { Management: true, Personnel: true },
    });
    return !!user; // Returns true if user is found, false otherwise
  } catch (error) {
    throw new Error(error);
  }
}
