// subcategory

import mongoose from 'mongoose'
const Schema = mongoose.Schema

const EntrySchema = new Schema({
    name: { type: String, required: true },
    created: Date,
    updated: { type: Date, default: Date.now },
    category: { type: Schema.Types.ObjectId, ref: 'Category' }
})

export default mongoose.model('Sub', EntrySchema)
