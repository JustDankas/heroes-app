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
        "X-RapidAPI-Key": "ba006d25d3mshb73a35184cd604fp10709ejsn19ad616aa591",
        "X-RapidAPI-Host": "superhero-search.p.rapidapi.com",
      },
    }
  );
  const data = await response.json();
  if (!data) return res.status(404).send("Not found");
  res.status(200).json(data);
}
