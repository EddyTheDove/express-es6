import { Seeder } from 'mongoose-data-seed'
import { Sub, User, Entry, Category } from '../models'

let data = []

class EntriesSeeder extends Seeder {
    async beforeRun() {
        this.categories = await Category.find()
        .populate('owner')
        .exec()

        for (let category of this.categories) {
            category.subs = await Sub.find({ category: category.id }).sort({ created: 1 }).exec()
        }

        data = [
            {
                amount: 3000.00,
                type: "income",
                description: "Mama's deposit",
                ownder: this.categories[0].owner.id
            },
            {
                amount: 360.00,
                type: 'expense',
                ownder: this.categories[0].owner.id,
                category: this.categories[0].id,
                sub: this.categories[0].subs[0].id
            },
            {
                amount: 19.50,
                type: 'expense',
                ownder: this.categories[1].owner.id,
                category: this.categories[1].id,
                description: "Bought some candies for trick and treat"
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
