module.exports = function paginatePlugin(schema, options) {
    schema.statics = {
        async paginate (req, limit) {
            let page = req.query.page || 1
            let skip = limit * (page - 1)

            try {
                const result = await this.find()
                .sort({ created: -1 })
                .skip(+skip)
                .limit(+limit)
                .exec()

                const total = await this.count().exec()
                let totalPages = Math.round(total / limit)

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
                    data: result
                }
            }
            catch(error) {
                console.log(error)
                return error
            }
        }
    }
}
