
import { LeanDocument } from 'mongoose';
import Session, { SessionDocument } from "../model/session.model";
import { UserDocument } from '../model/user.model';
import { sign, decode } from "../utils/jwt.utils";
import { findUser } from "./user.service";
import config from 'config';
import {get} from 'lodash';

// create session
export async function createSession(
    userId: any, userAgent: string ) {

    const session = await Session.create( { user: userId, userAgent } );
    return session.toJSON();
}

export function createAccessToken( {
    user,
    session,
}: {
    user:
    | UserDocument
    | LeanDocument<UserDocument>
    ;
    session:
    | SessionDocument
    | LeanDocument<SessionDocument>;
} ) {
    // Build and return the new access token
    const accessToken = sign(
        { ...user, session: session._id },
        { expiresIn: config.get( "accessTokenTtl" ) } // 15 minutes
    );

    return accessToken;
}


export async function reIssueAccessToken( {
    refreshToken,
}: {
    refreshToken: string;
} ) {
    // Decode the refresh token
    const { decoded } = decode( refreshToken );

    if ( !decoded || !get( decoded, "_id" ) ) return false;

    // Get the session
    const session = await Session.findById( get( decoded, "_id" ) );

    // Make sure the session is still valid
    if ( !session || !session?.valid ) return false;

    const user = await findUser( { _id: session.user } );

    if ( !user ) return false;

    const accessToken = createAccessToken( { user, session } );

    return accessToken;
}