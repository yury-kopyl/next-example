import type {NextApiRequest, NextApiResponse} from 'next'
import dbEmulator from "#lib/db-emulator";
import {hashPassword} from "#lib/helpers";
import {SignUp} from "#app/entities/auth";
import {UserResponse} from "#app/entities/userEntities";


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<UserResponse | { message: string }>
) {
    const body: SignUp = req.body;
    const {confirm, ...user} = body;
    const userExists = dbEmulator.findOne({email: user.email});

    if (userExists) {
        res.status(400).json({message: 'UserEntities exists'});
    } else {
        const {salt, password} = hashPassword(user.password);

        const createdUser = dbEmulator.insertOne({
            ...user,
            password,
            salt,
        })

        const {email, name, lastName} = createdUser;

        res.status(200).json({
            email,
            name,
            lastName,
        })
    }
}
