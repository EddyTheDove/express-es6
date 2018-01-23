import mongoose from './mongoose'
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    name: { type: String, required: true },
    colour: { type: String, default: '#2872d7' },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    owner: { type: Schema.Types.ObjectId, ref: 'User' }
}, { toJSON: { virtuals: true } })

// HasMany entries
// CategorySchema.virtual('entries', {
//     ref: 'Entry',
//     localField: '_id',
//     foreignField: 'category',
//     justOne: false
// })

// HasMany subs
// CategorySchema.virtual('subs', {
//     ref: 'Sub',
//     localField: '_id',
//     foreignField: 'category',
//     justOne: false
// })

// Model methods
CategorySchema.statics = {
    list ({ owner } = {})  {
        return this.find({ owner })
        .populate('subs')
        .sort({ name: 1 })
        .exec()
    }
}

export default mongoose.model('Category', CategorySchema)
