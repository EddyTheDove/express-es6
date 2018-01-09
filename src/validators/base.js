
export function validationError (res, error) {
    if (error) {
        return res.status(400).send({
            error: 'validation error',
            message: error.details[0].message
        })
    }
}
