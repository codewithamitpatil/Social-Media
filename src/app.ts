import express, { Express } from 'express';
import config from 'config';
import cors from 'cors';

import errorHandler from './middleware/errorHandler';
import Connect from './db/mongoCon';
import Routes from './routes/index.routes';

const port = config.get( 'port' ) as number;
const host = config.get( 'host' ) as string;

const app: Express = express();

// enable cors
app.use( cors() );
// to parse urlencoded data
app.use( express.urlencoded( { extended: true } ) );
// for json parsing
app.use( express.json() );


// intialize routes
app.use( '/api', Routes );

// global/centrlize error handler
app.use( errorHandler );

const server = () => {

   app.listen( port, () => {
      console.log( `Server is running on http://${ host }:${ port }` );
   } );

};


const db = () => {

   Connect().on( 'error', err => {
      console.error( err );
   } ).on( 'disconnect', () => {
      console.log( 'Mongodb is disconnected' );
   } ).once( 'open', () => {
      console.log( 'mongodb is connected ' );
      //start server
      server();
   } );

};

// start mongodb
db();