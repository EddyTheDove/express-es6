import Joi from 'joi'
import { validationError } from './base'

export const userValidator = {
    register (req, res, next) {
        const { error, value } = Joi.validate(req.body, {
            email: Joi.string().email().required(),
            firstname: Joi.string().alphanum(),
            lastname: Joi.string().alphanum(),
            password: Joi.string().min(4).required()
        })

        if (error) return validationError(res, error)
        next()
    }
}
