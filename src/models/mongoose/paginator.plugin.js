module.exports = function (schema, options) {
    schema.statics.paginate = function ({ req, limit, data, total } = {}) {
        let page = req.query.page || 1

        try {
            let totalPages = Math.ceil(total / limit)

            // Minimum number of pages should be 1
            if (totalPages === 0) {
                if (total > 0) {
                    totalPages = 1
                }
            }

            // Define the full url for next page
            let nextUrl = req.protocol + '://' + req.get('host') + req.originalUrl
            let nextPage = totalPages > page ? page + 1 : null
            if (nextPage) {
                nextUrl += '?page=' + nextPage
            }

            return {
                total: total,
                per_page: limit,
                current_page: page,
                pages_count: totalPages,
                next_page: nextPage ? nextUrl : null,
                data: data
            }
        }
        catch(error) {
            console.log(error)
            return error
        }
    }
}
