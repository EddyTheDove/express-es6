import passport from 'passport'

const AuthMiddleware = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (!user) {
            return res.status(401).send('Unauthorized')
        }
        req.user = user
        next()
    })(req, res, next)
}

export default AuthMiddleware
