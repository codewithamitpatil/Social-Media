import mongoose from 'mongoose';
import config from 'config';

const Connect = () => {

  let uri = config.get( 'mongoUri' ) as string;
  let options = config.get( 'mongoOptions' ) as object;

  mongoose.connect( uri, options );
  mongoose.Promise = global.Promise;
  return mongoose.connection;

};

// export
export default Connect;