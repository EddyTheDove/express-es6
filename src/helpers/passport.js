import passport from 'passport'
import config from '../../config'
import User from '../models/User'
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    secretOrKey: config.jwtSecret
}

passport.use(new JwtStrategy(options, function (payload, done) {
    User.findOne({ id: payload.user.id }, function (error, user) {
        if (error) return done(error, false)

        if (user) return done(null, user)
        else return done(null, false)
    })
}))
