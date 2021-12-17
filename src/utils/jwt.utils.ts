
import jwt from 'jsonwebtoken';
import client from './../db/redisCon';
import config from 'config';

const privateKey = config.get( 'privateKey' ) as string;

// to genrate tokens
export async function signToken(
    obj: Object, options?: jwt.SignOptions | undefined ) {

    return jwt.sign( obj, privateKey, options );

}

// to genrate token
export function sign( object: Object, options?: jwt.SignOptions | undefined ) {
    return jwt.sign( object, privateKey, options );
}

export function decode( token: string ) {
    try {
        const decoded = jwt.verify( token, privateKey );
        return {
            valid: true,
            expired: false,
            decoded
        };
    } catch ( error: any ) {
        return {
            valid: false,
            expired: error.message === "jwt expired",
            decoded: null,
        };
    }
}
