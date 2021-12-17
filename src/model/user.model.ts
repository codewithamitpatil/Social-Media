import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';


export interface UserDocument extends mongoose.Document {
    uname: string;
    password: string;
    email: string;
    comparePass( password: string ): Promise<boolean>;
}

const UserSchema = new mongoose.Schema( {
    email: {
        type: String,
        required: true,
        unique: true
    },
    uname: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},
    { timestamps: false } );


// before saving password
UserSchema.pre( "save", async function ( next: any ) {

    const user = this as UserDocument;

    if ( !user.isModified( 'password' ) ) {
        return next();
    }

    const salt = await bcrypt.genSalt( config.get( 'saltWorkFactor' ) as number );
    const hash = await bcrypt.hashSync( user.password, salt );

    user.password = hash;
    return next();

} );

// compare password method
UserSchema.methods.comparePass = async function ( password: string ) {
    const user = this as UserDocument;
    return bcrypt.compare( password, user.password ).catch( ( e ) => false );
};


const User = mongoose.model<UserDocument>( 'User', UserSchema );

export default User;
