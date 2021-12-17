import { NextFunction, Response, Request } from "express";
import { creteUser, validatePassword } from "../service/user.service";
import { omit } from 'lodash';

//signup
export async function CreateUserHandler(
    req: Request,
    res: Response,
    next: NextFunction ) {

    const user = await creteUser( req.body );
    return res.status( 200 ).send( omit( user.toJSON(), "pass" ) );

}

