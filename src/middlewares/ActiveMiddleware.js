const ActiveMiddleware = (req, res, next) => {
    const user = req.user

    if (!user) {
        console.log('ActiveMiddleware Error. No user found in request.')
    }

    if (!user.is_active) {
        return res.status(401).json({ error: 'Account not activated.' })
    }

    next()
}

export default ActiveMiddleware
