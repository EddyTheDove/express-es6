import moment from 'moment'
import { Sub, User, Entry, Category } from '../models'


/**
 * Create new entry
 * @returns { Entry }
 */

const store = async (req, res, next) => {
    // Avoid duplicated categories
    const categoryNameIsTake = Category.findOne({
        name: req.body.name,
        user: req.user.id
    })

    if (categoryNameIsTake) {
        return res.status(400).json('That category already exists')
    }

    const category = new Category({
        name: req.body.name,
        colour: req.body.colour,
        created: moment(),
        owner: req.user.id
    })

    let subs = req.body.subs

    try {
        const savedCategory = await category.save()

        if (subs.length) {
            subs.forEach(s => {
                s.owner = req.user.id
                s.category = savedCategory.id
            })
            await Sub.create(subs)
        }

        return res.json(savedCategory)
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
        const data = await Category.list(req, limit)
        const result = await Category.paginate(req, limit, data)
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
        return res.json(data)
    }
    catch (e) {
        console.log('Query error => ', e)
        return res.status(500).send(e)
    }
}


export const CategoryController = { store, list, userCategories }
