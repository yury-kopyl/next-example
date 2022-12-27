import type { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import dbEmulator from "#lib/db-emulator";
import {validatePassword} from "#lib/helpers";
import {SignIn} from "#app/entities/auth";
import {UserResponse} from "#app/entities/userEntities";
import {sessionOptions} from "#lib/session";


async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserResponse | { message: string }>
) {
  const body: SignIn = req.body;
  const user = dbEmulator.findOne({ email: body.email });

  if (!user) {
    return res.status(400).json({ message: 'UserEntities not found' });
  }

  const passwordIsValid = validatePassword(user.password, body.password, user.salt);

  if (!passwordIsValid) {
    return res.status(401).send({ message: 'Invalid Password!' });
  }

  const userResponse: UserResponse = { email: user.email, name: user.name, lastName: user.lastName };

  req.session.user = userResponse;
  await req.session.save();

  res.status(200).json(userResponse);
}

export default withIronSessionApiRoute(handler, sessionOptions);