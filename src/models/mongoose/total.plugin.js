module.exports = function (schema, options) {
    schema.statics.total = function ({ owner } = {}) {
        try {
            let query = this.count()

            if (owner) {
                query = query.where('owner').equals(owner)
            }
            return query.exec()
        }
        catch(error) {
            console.log(error)
            return error
        }
    }
}
