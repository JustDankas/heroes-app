import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req;
  const { hero, villain } = query;
  if (hero || villain) {
    const response = await fetch(
      `https://superhero-search.p.rapidapi.com/api/?${
        hero ? "hero=" + hero : "villain=" + villain
      }`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "ba006d25d3mshb73a35184cd604fp10709ejsn19ad616aa591",
          "X-RapidAPI-Host": "superhero-search.p.rapidapi.com",
        },
      }
    );

    const text = await response.text();
    if (text === "Hero Not Found") res.status(404).send("Not Found");
    else res.status(200).json(JSON.parse(text));
  } else return res.status(400).send("Bad Request");
}
