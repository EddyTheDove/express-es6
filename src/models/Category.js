import mongoose from './mongoose'
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    name: { type: String, required: true },
    colour: String,
    created: Date,
    updated: { type: Date, default: Date.now },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    subs: [{ type: Schema.Types.ObjectId, ref: 'Sub' }]
})

export default mongoose.model('Category', CategorySchema)
