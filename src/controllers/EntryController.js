import moment from 'moment'
import { Sub, User, Entry, Category } from '../models'

/**
 * Create new entry
 * @returns { Entry }
 */

const store = async (req, res, next) => {
    const entry = new Entry({
        type: req.body.type,
        amount: req.body.amount,
        description: req.body.description,
        created: moment(),
        date: req.body.date,
        owner: req.user.id
    })

    if (req.body.category) entry.category = req.body.category
    if (req.body.sub) entry.sub = req.body.sub

    try {
        const savedEntry = await entry.save()
        const user = req.user
        const balance = await user.increaseBalance({
            type: savedEntry.type,
            amount: savedEntry.amount
        })
        return res.json(savedEntry)
    } catch (e) {
        console.log('Query error => ', e)
        return res.status(500).send(e)
    }
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
        const result = await Entry.paginate(req, limit, data)
        return res.json(result)
    }
    catch (e) {
        console.log('Query error => ', e)
        return res.status(500).send(e)
    }
}


/**
 * List a user's entries
 */
const userEntries = async (req, res, next) => {
    const user = req.user
    let page = req.query.page || 1
    let limit = req.query.limit || 5

    try {
        const data = await Entry.list({ owner: user.id, req, limit })
        const total = await Entry.total({ owner: user.id })
        const result = await Entry.paginate({ req, limit, data, total })
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

export const EntryController = { store, list, remove, userEntries }
