import Joi from 'joi'
import { validationError } from './base'

export const categoryValidator = {
    store (req, res, next) {
        const { error, value } = Joi.validate({
            name: req.body.name,
            colour: req.body.colour
        }, {
            name: Joi.string().required(),
            colour: Joi.string().required()
        })

        if (error) return validationError(res, error)
        next()
    }
}
