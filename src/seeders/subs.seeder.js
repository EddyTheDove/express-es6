import { Seeder } from 'mongoose-data-seed'
import { Sub, Category } from '../models'

const house = [{ name: 'Rent' }, { name: 'Electricity' }, { name: 'Internet' }]
const car = [{ name: 'Insurance' }, { name: 'Servicing' }, { name: 'Fuel' }]

class SubsSeeder extends Seeder {
    async beforeRun() {
        this.cats = await Category.find().exec()
    }

    async shouldRun() {
        return Sub.count().exec().then(count => count === 0);
    }

    async run() {
        const finals = []
        car.map(c => {
            c.category = this.cats[1].id
            finals.push(c)
        })
        house.map(c => {
            c.category = this.cats[0].id
            finals.push(c)
        })

        return Sub.create(finals)
    }
}

export default SubsSeeder
