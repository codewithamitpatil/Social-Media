
import express, { Express, Request, Response, NextFunction } from 'express';

import { CreateUserHandler } from '../controller/user.controller';
import { CreateUserSessionHandler } from '../controller/session.controller';

import validate from '../middleware/validateRequest';
import { createUserSchema, validateUserSchema } from '../schema/user.schema';
import { asyncHandler } from '../middleware/asyncHandler';

import { sessionHandler } from '../controller/session';
import { sessionUserSchema } from '../schema/user.schema';

const router = express.Router();

// signup / create user 
router.post( '/signup',
  validate( createUserSchema ),
  asyncHandler( CreateUserHandler ) );

// login
router.post( '/login',
  validate( validateUserSchema ),
  asyncHandler( CreateUserSessionHandler ) );

// for signin
router.post( '/signin', validate( sessionUserSchema ), asyncHandler( sessionHandler ) )


// export
export default router;