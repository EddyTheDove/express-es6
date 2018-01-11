import moment from 'moment'
import { Sub, User, Entry, Category } from '../models'

/**
 * Load entry and append to request
 */
function load (req, res, next, id) {
    Entry.get(id)
    .then((result) => {
        req.entry = result;
        return next()
    })
    .catch(e => next(e))
}

/**
 * Get entry
 * @returns { Entry }
 */
function get (req, res) {
    return res.json(req.entry)
}

/**
 * Create new entry
 * @returns { Entry }
 */
function store (req, res, next) {
    const entry = new Entry({
        type: req.body.type,
        amount: req.body.amount,
        description: req.body.description,
        created: moment(),
        owner: req.user.id
    })

    entry.save()
    .then( saved => res.json(saved))
    .catch(e => next(e))
}

/**
 * Update an entry
 * @returns { Entry }
 */
function update (req, res, next) {
    const entry = req.entry
    entry.type = req.body.type
    entry.amount = req.body.amount

    entry.save()
    .then( saved => res.json(saved))
    .catch(e => next(e))
}

/**
 * List all entries
 * @returns { Entry }
 */

const list = async (req, res, next) => {
    let page = req.query.page || 1
    let limit = req.query.limit || 5

    try {
        const data = await Entry.list(req, limit)
        const result = await Entry.paginator(req, limit, data)
        return res.json(result)
    }
    catch (e) {
        console.log('Query error => ', e)
        return res.status(500).send(e)
    }
}

/**
 * Delete user.
 * @returns {User}
 */
 function remove(req, res, next) {
     const entry = req.entry;
     entry.remove()
     .then(deleted => res.json(deleted))
     .catch(e => next(e));
 }

export const EntryController = { load, get, store, update, list, remove }
