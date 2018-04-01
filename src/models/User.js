import mongoose from './mongoose'

const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const saltRounds = 10

const UserSchema = new Schema({
    firstname: String,
    lastname: String,
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    password: { type: String },
    email: { type: String, unique: true, required: true, index: true },
    income: { type: Number, default: 0 },
    expenses: { type: Number, default: 0 },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    is_active: { type: Boolean, default: true }
}, { toJSON: { virtuals: true } }) //Set virtuals to true

// HasMany Entries
UserSchema.virtual('entries', {
    ref: 'Entry',
    localField: '_id',
    foreignField: 'owner',
    justOne: false
})


// Middleware executed before saving any user
UserSchema.pre('save', function (next) {
    const user = this

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next()

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
    },

    entries ({ id, req, limit = 0 } = {}) {
        return this.findOne({_id: id})
        .populate('entries')
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

    increaseBalance ({ type, amount } = {}) {
        const user = this

        if ('income' === type) {
            user.income += amount
        } else {
            user.expenses += amount
        }
        return this.save()
    },

    decreaseBalance ({ type, amount } = {}) {
        const user = this

        if ('income' === type) {
            user.income -= amount
        } else {
            user.expenses -= amount
        }
        return this.save()
    },

    response () {
        return {
            id: this._id,
            email: this.email,
            firstname: this.firstname,
            lastname: this.lastname,
            token: this.token,
            income: this.income,
            expenses: this.expenses,
            role: this.role,
            is_active: this.is_active
        }
    },

    in () {
        return this.entries
    }
})

module.exports = mongoose.model('User', UserSchema)
