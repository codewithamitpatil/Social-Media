
import mongoose from 'mongoose';
import config from 'config';
import { UserDocument } from './user.model';


// interface
export interface SessionDocument extends mongoose.Document {

    user: UserDocument["_id"];
    valid: boolean;
    userAgent: string,
    createdAt: Date;
    updatedAt: Date;

}

// schema
const SessionSchema = new mongoose.Schema( {

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    valid: {
        type: Boolean,
        default: true
    },
    userAgent: {
        type: String
    }

}, {
    timestamps: true
} );

// model
const Session = mongoose.model<SessionDocument>( "Session", SessionSchema );

// export
export default Session;













