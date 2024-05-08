import { genSalt, hash, compare } from "bcrypt";
import crypto from "crypto";
import { prisma } from "../config/prisma.connect";

export default async function hashPassword(password) {
  const saltHash = await genSalt(Number(process.env.SALT));
  return await hash(password, saltHash);
}

export async function generateVoucherCode({ customerId, product }) {
  try {
    const uniqueValue = Date.now().toString();
    const hash = crypto
      .createHash("sha256")
      .update(`${customerId}${product}${uniqueValue}`)
      .digest("hex");
    const tokenVoucher = await hashPassword(`${customerId}${product}`);
    const sliceHash = hash.substring(0, 11).toUpperCase();
    return { hash: sliceHash, token: tokenVoucher };
  } catch (err) {
    return { error: err, message: "failed to created hash" };
  }
}

export const isVoucherValidHelper = async (hashToCheck) => {
  try {
    const findHash = await prisma.voucher.findUnique({
      where: {
        voucherCode: hashToCheck,
      },
      include: {
        customer: true,
        product: {
          include: {
            productAllocation: true
          }
        }
      }
    });
    const checkVHash = await compare(hashToCheck, findHash.voucherCode);
    if (!findHash && !checkVHash) {
      return { error: "invalid, voucher cannot be found or verified" };
    }
    return { data: findHash};
  } catch (err) {
    return { error: err, message: "system error" };
  }
};
