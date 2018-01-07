import mongoose from 'mongoose'
import Promise from 'bluebird'
const Schema = mongoose.Schema

const EntrySchema = new Schema({
    amount: { type: Number, required: true },
    date: Date,
    type: { type: String, lowercase: true },
    description: String,
    sub: Schema.ObjectId,
    category: Schema.ObjectId,
    owner: Schema.ObjectId,
    created: Date,
    updated: { type: Date, default: Date.now }
})

// methods are avaialable on the document
EntrySchema.method({})

// statics ara available on the model
EntrySchema.statics = {
    get (id) {
        return this.findById(id)
        .exec()
    },


    listReverse ({ skip = 0, limit = 0 } = {}) {
        return this.find()
        .sort({ created: -1 })
        .skip(+skip)
        .limit(+limit)
        .exec()
    }
}

export default mongoose.model('Entry', EntrySchema)
