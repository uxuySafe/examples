// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Connection, clusterApiUrl } from "@solana/web3.js"

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { method, headers, body } = req;


  const connection = new Connection(clusterApiUrl("mainnet-beta"));


  const result =  await connection.getRecentBlockhash()
  res.statusCode = 200
  res.send(result)


}
