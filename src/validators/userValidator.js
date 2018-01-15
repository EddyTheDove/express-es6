import Joi from 'joi'
import { validationError } from './base'

export const userValidator = {
    register (req, res, next) {
        const { error, value } = Joi.validate({
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password
        }, {
            email: Joi.string().email().required(),
            firstname: Joi.string().alphanum(),
            lastname: Joi.string().alphanum(),
            password: Joi.string().min(4).required()
        })

        if (error) return validationError(res, error)
        next()
    }
}
