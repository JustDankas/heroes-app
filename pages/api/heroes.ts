import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(
    "https://superhero-search.p.rapidapi.com/api/heroes",
    {
      headers: {
        "X-RapidAPI-Key": process.env.RapidAPI_Key || "",
        "X-RapidAPI-Host": process.env.RapidAPI_Host || "",
      },
    }
  );
  const data = await response.json();
  if (!data) return res.status(404).send("Not found");
  res.status(200).json(data);
}
