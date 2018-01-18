import { Seeder } from 'mongoose-data-seed';
import { Category, User } from '../models';

const data = [
    { name: 'House', colour: '#0088cc' },
    { name: 'Car', colour: '#f122d6' },
    { name: 'Miscellaneous', colour: '#f39c12' }
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
