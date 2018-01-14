import mongoose from './mongoose'
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    name: { type: String, required: true },
    colour: { type: String, default: '#2872d7' },
    created: Date,
    updated: { type: Date, default: Date.now },
    owner: { type: Schema.Types.ObjectId, ref: 'User' }
})

// HasMany entries
CategorySchema.virtual('entries', {
    ref: 'Entry',
    localField: '_id',
    foreignField: 'category',
    justOne: false
})

// HasMany subs
CategorySchema.virtual('subs', {
    ref: 'Sub',
    localField: '_id',
    foreignField: 'category',
    justOne: false
})

// Model methods
CategorySchema.statics = {
    list ({ owner, page = 1, limit = 10 } = {}) {
        const skip = limit * (page - 1)

        return this.find({ owner })
        .sort({ name: 1 })
        .skip(+skip)
        .limit(+limit)
        .populate('sub', '_id name')
        .exec()
    }
}

export default mongoose.model('Category', CategorySchema)
