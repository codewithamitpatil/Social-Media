
import { Request, Response, NextFunction } from 'express';

const validate = ( schema: any ) => async (

    req: Request,
    res: Response,
    next: NextFunction

) => {

    try {

        await schema.validateAsync( {
            body: req.body
        } );

        return next();

    } catch ( e: any ) {
        return next( e );
    }

};

export default validate; 