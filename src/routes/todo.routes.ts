
import express, { Response, Request, NextFunction } from 'express';

const router = express.Router();

// get all todos
router.get( '', async ( req: Request, res: Response, next: NextFunction ) => {
    res.send( 'get all todos' );
} );

// get todo by id
router.get( '/:id', async ( req: Request, res: Response, next: NextFunction ) => {
    res.send( 'get id' );
} );

// create todo 
router.post( '', async ( req: Request, res: Response, next: NextFunction ) => {
    res.send( 'create id' );
} );

// update todo by id
router.put( '', async ( req: Request, res: Response, next: NextFunction ) => {
    res.send( 'update id' );
} );

// delete todo by id
router.delete( '/:id', async ( req: Request, res: Response, next: NextFunction ) => {
    res.send( 'delete id' );
} );

// export
export default router;