
// import { object, string, ref } from 'yup';
import joi from 'joi';
import httpErrors from 'http-errors';

export const createUserSchema = joi.object( {
    body: joi.object( {
        uname: joi.string()
            .required()
            .error( new httpErrors.BadRequest( 'Uname is required' ) ),
        email: joi.string()
            .email()
            .required()
            .error( new httpErrors.BadRequest( 'Email is required' ) ),
        password: joi.string()
            .required()
            .error( new httpErrors.BadRequest( 'Password is required' ) )
    } )
} );

export const validateUserSchema = joi.object( {
    body: joi.object( {
        email: joi.string()
            .email()
            .required()
            .error( new httpErrors.BadRequest( 'All fields are required' ) ),
        password: joi.string()
            .required()
            .error( new httpErrors.BadRequest( 'All fields are required' ) ),
    } )
} );

// new
export const sessionUserSchema = joi.object( {

    body: joi.object( {

        email: joi.string()
            .email()
            .required()
            .error( new httpErrors.BadRequest( 'All Fields Are Required' ) ),
        password: joi.string()
            .required()
            .error( new httpErrors.BadRequest( 'All Fields Are Required' ) )
    } )

} );