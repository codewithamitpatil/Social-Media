
import { omit } from 'lodash';

import { DocumentDefinition, FilterQuery } from 'mongoose';
import User, { UserDocument } from "../model/user.model";

// create user
export async function creteUser(
    input: DocumentDefinition<UserDocument> ) {

    return await User.create( input );

};

// find user
export async function findUser( query: FilterQuery<UserDocument> ) {
    return User.findOne( query ).lean();
};

// validate password
export async function validatePassword( { email, password }: {
    email: UserDocument['email'],
    password: string
} ) {

    const user = await User.findOne( { email } );

    if ( !user ) {
        return false;
    }

    const isValid = await user.comparePass( password );

    if ( !isValid ) {
        return false;
    }

    return omit( user.toJSON(), "password" );

}

