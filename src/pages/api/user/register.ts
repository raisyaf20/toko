import type { NextApiRequest, NextApiResponse } from "next";
import { signUp } from "@/lib/firebase/serviceFirebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await signUp(req.body, (status: Boolean, msg: any) => {
      if (status) {
        res.status(200).json({ status: true, statusCode: 200, message: msg });
      } else {
        res
          .status(400)
          .json({ status: false, statusCode: 400, error: { message: msg } });
      }
    });
  } else {
    res.status(405).json({
      status: false,
      statusCode: 405,
      error: { message: "method not allowed" },
    });
  }
}
