import Joi from 'joi'

export default {
    validate (req, res, next) {
        const schema = {
            email: Joi.string().email().required(),
            firstname: Joi.string().alphanum(),
            lastname: Joi.string().alphanum(),
            password: Joi.string().min(4).required()
        }

        const { error, value } = Joi.validate(req.body, schema)
        if (error) {
            switch (error.details[0].context.key) {
                case 'email':
                    res.status(400).send({ error: 'Please provide a valid email address' })
                    break
                case 'password':
                    res.status(400).send({ error: 'Your password should be at least 4 characters long' })
                    break
                case 'firstname':
                case 'lastname':
                    res.status(400).send({ error: 'Your first/last name can only contain digits and lettrs' })
                    break
                default:
                    res.status(400).send({ error: 'Please check your credentials' })
            }
        } else {
            next()
        }
    },

    exists (req, res, next) {
        const email = req.body.email

        next()
    }
}
