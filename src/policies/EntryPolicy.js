import Joi from 'joi'

export default {
    store (req, res, next) {
        const schema = {
            amount: Joi.number().required(),
            type: Joi.string().required()
        }

        const { error, value } = Joi.validate(req.body, schema)
        if (error) {
            switch (error.details[0].context.key) {
                case 'amount':
                    res.status(400).send({ error: 'The amount has to be a valid number' })
                    break
                case 'type':
                    res.status(400).send({ error: 'The type is missing' })
                    break
                default:
                    res.status(400).send({ error: 'Please check the data you sent' })
            }
        } else {
            next()
        }
    }
}
