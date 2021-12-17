
import { Request, Response, NextFunction } from 'express';
import { validatePassword, createSession, createAccessToken } from '../service/session';
import httpErrors from 'http-errors';

import { UserDocument } from '../model/user.model';
import { SessionDocument } from '../model/session.model';

import { sign } from '../utils/jwt.utils';
import config from 'config';

// for signin
export async function sessionHandler(
    req: Request, res: Response, next: NextFunction ) {

    // validate passowrd
    const user = <UserDocument>await validatePassword( req.body );

    if ( !user ) {
        return next( new httpErrors.Unauthorized( 'Invalid Email Or Password' ) );
    }

    const userAgent = req.get( 'user-agent' ) as string;

    // create session
    const session = <SessionDocument>await createSession( user._id, userAgent );

    // create access token
    const accessToken = await createAccessToken( {
        user,
        session
    } );

    // create refresh token
    const refreshToken = await sign( { ...session }, {
        expiresIn: config.get( 'refreshTokenTtl' ) as string
    } );

    // return tokens
    res.status( 200 ).send( { accessToken, refreshToken } );

}