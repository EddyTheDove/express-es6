// subcategory

import mongoose from 'mongoose'
const Schema = mongoose.Schema

const EntrySchema = new Schema({
    name: { type: String, required: true },
    category: Schema.ObjectId,
    created: Date,
    updated: { type: Date, default: Date.now }
})

export default mongoose.model('Sub', EntrySchema)
