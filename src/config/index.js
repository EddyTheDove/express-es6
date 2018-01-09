require('dotenv').config()

export default {
    env: process.env.NODE_ENV,
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || 'secret',
    mongodb: process.env.MONGO_DB,
    mongooseDebug: process.env.NODE_ENV ===  'development' ? true : false
}
