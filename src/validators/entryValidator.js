import Joi from 'joi'
import { validationError } from './base'

export const entryValidator = {
    store (req, res, next) {
        const { error, value } = Joi.validate({
            amount: req.body.amount,
            type: req.body.type
        }, {
            amount: Joi.number().required(),
            type: Joi.string().required()
        })

        if (error) return validationError(res, error)
        next()
    }
}
