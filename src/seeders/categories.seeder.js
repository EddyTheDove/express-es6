import { Seeder } from 'mongoose-data-seed';
import { User } from '../models';
import { Category } from '../models';

const data = [
    { name: 'House', colour: '#08c' },
    { name: 'Car', colour: '#f80' },
    { name: 'Miscellaneous', colour: 'pink' }
];

class CategoriesSeeder extends Seeder {
    async beforeRun() {
        this.users = await User.find().exec()
    }

    async shouldRun() {
        return Category.count().exec()
        .then(count => count === 0)
    }

    async run() {
        data.map(c => {
            c.owner = this.users[0].id
        })
        return Category.create(data)
    }
}

export default CategoriesSeeder;
