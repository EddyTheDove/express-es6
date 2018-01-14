import { Seeder } from 'mongoose-data-seed';
import { Category, User } from '../models';

const data = [
    { name: 'House', colour: '#08c' },
    { name: 'Car', colour: '#f80' },
    { name: 'Miscellaneous', colour: 'pink' }
];

class CategoriesSeeder extends Seeder {
    async beforeRun() {
        this.user = await User.findOne({ email: 'user@email.com' }).exec()
    }

    async shouldRun() {
        return Category.count().exec()
        .then(count => count === 0)
    }

    async run() {
        data.map(c => {
            c.owner = this.user.id
        })
        return Category.create(data)
    }
}

export default CategoriesSeeder;
