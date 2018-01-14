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
        owner: req.user.id
    })

    try {
        const savedEntry = await entry.save()
        const user = req.user
        const balance = await user.increaseBalance({
            type: saved.type,
            amount: saved.amount
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
        const result = await Entry.paginator(req, limit, data)
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
const userCategories = async (req, res, next) => {
    const user = req.user
    let page = req.query.page || 1
    let limit = req.query.limit || 5

    try {
        const data = await Category.list({ owner: user.id, req, limit })
        const total = await Category.total({ owner: user.id })
        const result = await Category.paginate({ req, limit, data, total })
        return res.json(result)
    }
    catch (e) {
        console.log('Query error => ', e)
        return res.status(500).send(e)
    }
}


export const CategoryController = { store, list, userCategories }
