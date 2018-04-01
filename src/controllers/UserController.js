import moment from 'moment'
import { User, Entry } from '../models'

/**
 * Load user and append to request
 */
function load (req, res, next, id) {
    User.get(id)
    .then((result) => {
        req.user = result;
        return next()
    })
    .catch(e => next(e))
}

/**
 * Get user
 * @returns { User }
 */
function get (req, res) {
    return res.json(req.user)
}

/**
 * Create new user
 * @returns { User }
 */
function store (req, res, next) {
    const user = new User({
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
        created: moment()
    })

    user.save()
    .then( saved => res.json(saved))
    .catch(e => res.status(500).json(e))
}

/**
 * Update an user
 * @returns { User }
 */
function update (req, res, next) {
    const user = req.user
    user.email = req.body.email
    user.firstname = req.body.firstname
    user.lastname = req.body.lastname

    user.save()
    .then( saved => res.json(saved))
    .catch(e => next(e))
}

/**
 * List all users
 * @returns { User }
 */
const list = async (req, res, next) => {
    const result = await User.list()
    return res.json(result)
}

/**
 * List a user's entries
 */
const userEntries = async (req, res, next) => {
    const user = req.user
    let page = req.query.page || 1
    let limit = req.query.limit || 5

    try {
        const data = await User.entries({ id: user.id, req, limit })
        // const result = await Entry.paginator(req, limit, data)
        return res.json(data)
    }
    catch (e) {
        console.log('Query error => ', e)
        return res.status(500).send(e)
    }
}


const balance = async (req, res, next) => {
    const user = req.user

    try {
        const result = await User.entries({ id: user.id })

        if (result.entries) {
            const expenses = result.entries.filter(e => e.type === 'expense').reduce((a, b) => a + b.amount, 0)
            const incomes = result.entries.filter(e => e.type === 'income').reduce((a, b) => a + b.amount, 0)
            return res.json({ expenses, incomes, total: incomes - expenses })
        }

        return res.json({ expenses: 0, incomes: 0, total: 0 })
    } catch (e) {
        return res.status(500).send(e)
    }
}

/**
 * Delete user.
 * @returns {User}
 */
 function remove(req, res, next) {
     const user = req.user;
     user.remove()
     .then(deleted => res.json(deleted))
     .catch(e => next(e));
 }

export const UserController = { load, get, store, update, list, remove, balance }
