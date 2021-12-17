
import express, { Request, Response, NextFunction } from 'express';

import userRoutes from './user.routes';
import todoRoutes from './todo.routes';

const router = express.Router();


// intialize user routes
router.use( '/auth', userRoutes );
router.use( '/todo', todoRoutes );

// health check route
router.get( '/health', async ( req: Request, res: Response ) => {
    return res.status( 200 ).send( 'dont worry server is up and running' );
} );


// export
export default router;