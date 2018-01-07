import mongoose from 'mongoose'
const Schema = mongoose.Schema

const EntrySchema = new Schema({
    name: { type: String, required: true },
    colour: String,
    owner: Schema.ObjectId,
    created: Date,
    updated: { type: Date, default: Date.now }
})

export default mongoose.model('Category', EntrySchema)
