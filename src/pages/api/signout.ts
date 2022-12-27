import type { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import {sessionOptions} from "#lib/session";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<null | { message: string }>
) {
  await req.session.destroy();

  res.status(200).send(null);
}

export default withIronSessionApiRoute(handler, sessionOptions);
