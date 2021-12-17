
import redis from 'redis';
import config from 'config';

const options = config.get( 'redisDb' ) as object;

const client = redis.createClient( options );

client.on( 'connect', async () => {
    console.log( 'Redis Connected SuccessFully' )
} );

client.on( 'error', async ( err ) => {
    console.log( err );
} );

client.on( 'end', async () => {
    console.log( 'Redis disconnected' );
} );

process.on( 'SIGINT', () => {
    client.quit();
    process.exit( 0 );
} );

// export connection
export default client;



