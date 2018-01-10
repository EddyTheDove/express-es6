const mongoose = require('mongoose')
import paginate from './paginate.plugin'

mongoose.plugin(paginate)
export default mongoose
