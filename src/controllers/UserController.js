import moment from 'moment'
import Model from '../models/User'

/**
 * Load user and append to request
 */
function load (req, res, next, id) {
    Model.get(id)
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
    const user = new Model({
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
 * List all entries
 * @returns { User }
 */
const list = async (req, res, next) => {
    const result = await Model.list()
    return res.json(result)
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

export const UserController = { load, get, store, update, list, remove }
