import config from '../config'
const jwt = require('jsonwebtoken')

export const jwtSignUser = (user) => {
    const oneMinute = 60
    const oneWeek = 60 * 60 * 24 * 7
    return jwt.sign({ user: user }, config.jwtSecret)
}
