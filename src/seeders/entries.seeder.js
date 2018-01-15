import { Seeder } from 'mongoose-data-seed'
import { Sub, User, Entry, Category } from '../models'
import moment from 'moment'

let data = []

class EntriesSeeder extends Seeder {
    async beforeRun() {
        this.categories = await Category.find()
        .populate('owner')
        .exec()

        for (let category of this.categories) {
            category.subs = await Sub.find({ category: category.id }).sort({ created: 1 }).exec()
        }

        const today = moment().format('YYYY-MM-DD')

        data = [
            {
                amount: 3000.00,
                type: "income",
                description: "Mama's deposit",
                owner: this.categories[0].owner.id,
                date: today
            },
            {
                amount: 360.00,
                type: 'expense',
                owner: this.categories[0].owner.id,
                category: this.categories[0].id,
                sub: this.categories[0].subs[0].id,
                date: today
            },
            {
                amount: 19.50,
                type: 'expense',
                owner: this.categories[1].owner.id,
                category: this.categories[1].id,
                description: "Bought some candies for trick and treat",
                date: today
            }
        ]
    }

    async shouldRun() {
        return Entry.count().exec().then(count => count === 0);
    }

    async run() {
        return Entry.create(data)
    }
}

export default EntriesSeeder
