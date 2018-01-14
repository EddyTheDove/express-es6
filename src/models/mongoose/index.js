import mongoose from 'mongoose'
mongoose.plugin(require('./paginator.plugin'))
mongoose.plugin(require('./total.plugin'))

export default mongoose
