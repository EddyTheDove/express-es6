import mongoose from './mongoose'
const Schema = mongoose.Schema
// mongoose.set('debug', true) // See the query being sent to mongoose

const EntrySchema = new Schema({
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    type: { type: String, lowercase: true },
    description: String,
    created: Date,
    updated: { type: Date, default: Date.now },
    sub: { type: Schema.Types.ObjectId, ref: 'Sub' },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    category: { type: Schema.Types.ObjectId, ref: 'Category' }
})

// methods are avaialable on the document
EntrySchema.method({})

// statics ara available on the model
EntrySchema.statics = {
    get (id) {
        return this.findById(id)
        .exec()
    },

    list ({ owner, page = 1, limit = 10 } = {}) {
        const skip = limit * (page - 1)

        return this.find({ owner })
        .sort({ date: -1, created: -1 })
        .skip(+skip)
        .limit(+limit)
        .populate('sub', '_id name')
        .populate('category', '_id name')
        .exec()
    },
}

export default mongoose.model('Entry', EntrySchema)
