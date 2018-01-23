import { Sub, User, Entry, Category } from '../models'

/**
 * Store a new sub
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 */
const store = async (req, res, next) => {
    const newSub = new Sub({
        name: req.body.name,
        category: req.body.category
    })

    try {
        const savedSub = await newSub.save()
        return res.json(savedSub)
    } catch (e) {
        console.log('Query error => ', e)
        return res.status(500).send(e)
    }
}

/**
 * Update
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {Promise}       [description]
 */
const update = async (req, res, next) => {
    try {
        const sub = await Sub.findById(req.id).exec()
        if (!sub) {
            return res.status(404).json('No sub category found')
        }

        sub.name = req.body.name
        await sub.save()

        res.json(sub)
    } catch (e) {
        console.log('Query error => ', e)
        return res.status(500).send(e)
    }
}


/**
 * Delete a sub
 * @returns String
 */
 const remove = async (req, res, next) => {
     try {
         const sub = await Sub.findById(req.params.id).exec()

         if (sub) {
             await Entry.deleteMany({ sub: sub._id }).exec()
             await sub.remove()
         }

         return res.json('Sub category successfully deleted')
     } catch (e) {
         console.log('Query error => ', e)
         return res.status(500).json(e)
     }
 }

export const SubController = { store, remove, update }
