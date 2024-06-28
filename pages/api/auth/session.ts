import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT_SECRET environment variable is not defined");
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decodedPassword = jwt.verify(token, secret);
    return res.status(200).json({ user: decodedPassword });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
