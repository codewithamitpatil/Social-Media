
import { Response } from 'express';

// form mongoose duplicate error
export const handleDuplicateKeyError = ( err: any, res: Response ) => {

    const field = Object.keys( err.keyValue );
    const code = 409;
    const error = `An account with this ${ field } already exists.`;
    return res.status( code ).send( { status: code, messages: error } );

}

// mongoose validation error
export const handleValidationError = ( err: any, res: Response ) => {

    let errors = Object.values( err.errors ).
        map( ( el: any ) => el.message );
    let fields = Object.values( err.errors ).
        map( ( el: any ) => el.path );
    let code = 400;
    return res.status( code ).send( {
        messages: errors, fields: fields, status: code
    } );

}


