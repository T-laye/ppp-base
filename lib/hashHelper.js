import { genSalt, hash } from "bcrypt";

export default async function hashPassword(password) {
  const saltHash = await genSalt(Number(process.env.SALT));
  return await hash(password, saltHash);
}
