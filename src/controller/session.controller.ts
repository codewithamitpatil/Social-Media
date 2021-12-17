
import { Request, Response, NextFunction } from 'express';
import config from 'config';

import { validatePassword } from '../service/user.service';
import { createSession } from '../service/session.service';
import { sign } from '../utils/jwt.utils';
import { createAccessToken } from '../service/session.service';
import { UserDocument } from '../model/user.model';
import { SessionDocument } from '../model/session.model';

// login
export async function CreateUserSessionHandler(
    req: Request,
    res: Response,
    next: NextFunction ) {

    // password check
    let user = <UserDocument>await validatePassword( req.body );

    if ( !user ) {
        return res.status( 400 ).send( 'Invalid username or password' );
    }
    // user agent
    const userAgent: string = req.get( "user-agent" ) || '';

    // create session
    const session = <SessionDocument>await createSession( user._id, userAgent );


    // create access token
    const accessToken = createAccessToken( {
        user,
        session
    } );

    // create refresh token
    const refreshToken = sign( session, {
        expiresIn: config.get( "refreshTokenTtl" ), // 1 year
    } );

    // send refresh & access token back
    return res.send( { accessToken, refreshToken } );

}