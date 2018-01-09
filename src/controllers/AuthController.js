import moment from 'moment'
import User from '../models/User'
import { jwtSignUser } from '../helpers'

/**
 * Authenticate a user
 * @returns { User }
 */
async function login (req, res, next) {
     const { email, password } = req.body

     const user = await User.findByKey({ email: email })
     if (!user) {
         return res.status(403).json({ error: 'Please heck your credentials' })
     }

     const isPasswordValid = await user.comparePassword(password)
     if (!isPasswordValid) {
         res.status(403).json({ error: 'Please check your credentials' })
     } else {
         user.token = jwtSignUser(user)
         res.json(user.response())
     }
 }

// Register
function register (req, res, next) {
     const user = new User({
         email: req.body.email,
         firstname: req.body.firstname,
         lastname: req.body.lastname,
         password: req.body.password,
         created: moment()
     })

     user.save()
     .then( saved => res.json(saved.response()))
     .catch(e => res.status(500).json(e))
 }


 export default { login, register }
