import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT_SECRET environment variable is not defined");
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body;
  //as I didn't use any database I used static credentials
  if (username === "admin" && password === "password") {
    const token = jwt.sign({ username }, secret, { expiresIn: "1h" });
    return res.status(200).json({ token });
  }
  return res.status(401).json({ message: "Invalid credentials" });
};
