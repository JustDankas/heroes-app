import { NextApiRequest, NextApiResponse } from "next";
import villains from "@/villains.json";
import heroes2 from "@/heroes2.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json([heroes2, villains]);
  // res.status(200).send("Doesnt work anymore");
}
