import Joi from 'joi'

export default {
    store (req, res, next) {
        const { error, value } = Joi.validate({
            amount: req.body.amount,
            type: req.body.type
        }, {
            amount: Joi.number().required(),
            type: Joi.string().required()
        })

        if (error) {
            return res.status(400).send({
                error: 'validation error',
                message: error.details[0].message
            })
        }
        next()
    }
}
