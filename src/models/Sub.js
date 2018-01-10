// subcategory
import mongoose from './mongoose'
const Schema = mongoose.Schema

const EntrySchema = new Schema({
    name: { type: String, required: true },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    category: { type: Schema.Types.ObjectId, ref: 'Category' }
})

export default mongoose.model('Sub', EntrySchema)
