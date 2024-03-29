import { sign } from "jsonwebtoken";

export default function createAccessToken(id, email, role) {
  return sign(
    { id: id, email: email, role: role },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_REFRESH_TIME,
    }
  );
}
