import moment from 'moment'
import User from '../models/User'
import { jwtSignUser } from '../helpers/jwtsign'

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
         user.token = jwtSignUser({ _id: user._id, password: user.password })
         res.json(user.response())
     }
 }

 const auth = async (req, res, next) => {
     try {
         const user = req.user
         res.json(user.response())
     } catch (error) {
         res.status(500).send(error)
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


 export const AuthController = { login, register, auth }
