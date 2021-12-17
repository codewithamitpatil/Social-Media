

export default {
    port: 3001,
    host: 'localhost',
    mongoUri: 'mongodb://localhost:27017/quiz',
    mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // promiseLibrary: global.Promise
    },
    saltWorkFactor: 10,
    // for jwt token
    privateKey: 'amitisgood',
    accessTokenTtl: "5sec",
    refreshTokenTtl: "1y",
    redisDb: {
        port: 6379,
        host: '127.0.0.1'
    }

}