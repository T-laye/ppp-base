import { sign } from "jsonwebtoken";

export default function createAccessToken(id, email) {
  return sign({ id: id, email: email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_REFRESH_TIME,
  });
}
