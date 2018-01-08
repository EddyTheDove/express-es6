import mongoose from 'mongoose'
import Promise from 'bluebird'
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const saltRounds = 10

const UserSchema = new Schema({
    firstname: String,
    lastname: String,
    created: Date,
    updated: { type: Date, default: Date.now },
    password: { type: String },
    email: { type: String, unique: true, required: true, index: true },
    token: { type: String, unique: true, index: true },
    income: Number,
    expenses: Number
    // entries: [{ type: Schema.Types.ObjectId, ref: 'Entry' }],
    // categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }]
})


// Middleware executed before saving any user
UserSchema.pre('save', function (next) {
    const user = this

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) next()

    // generate a salt
    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) return next(err)

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err)

            // override the cleartext password with the hashed one
            user.password = hash
            next()
        })
    })
})

// statics ara available on the model
UserSchema.statics = {
    get (id) {
        return this.findById(id)
        .exec()
    },

    findByKey (...params) {
        return this.findOne(...params)
        .exec()
    },

    listReverse ({ skip = 0, limit = 0 } = {}) {
        return this.find()
        .sort({ created: -1 })
        .skip(+skip)
        .limit(+limit)
        .exec()
    },

    list ({ skip = 0, limit = 0 } = {}) {
        return this.find()
        .skip(+skip)
        .limit(+limit)
        .exec()
    }
}

/**
 * Methods
 */
UserSchema.method({
    comparePassword (password) {
        return bcrypt.compare(password, this.password)
    },

    toJson () {
        return {
            email: this.email,
            firstname: this.firstname,
            lastname: this.lastname,
            token: this.token,
            income: this.income,
            expenses: this.expenses
        }
    }
})

export default mongoose.model('User', UserSchema)
