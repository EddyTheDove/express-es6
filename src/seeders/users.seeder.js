import { Seeder } from 'mongoose-data-seed';
import { User } from '../models';

const data = [
    {
        email: 'user@email.com',
        password: 'pass',
        firstname: 'John',
        lastname: 'Doe',
        role: 'user',
        income: 3000,
        expenses: 379.50
    },
    {
        email: 'jane@email.com',
        password: 'pass',
        firstname: 'Jane',
        lastname: 'Snow',
        role: 'user'
    },
    {
        email: 'admin@email.com',
        password: 'pass',
        firstname: 'Admin',
        lastname: 'Master',
        role: 'admin'
    }
]

class UsersSeeder extends Seeder {

  async shouldRun() {
    return User.count().exec().then(count => count === 0);
  }

  async run() {
    return User.create(data);
  }
}

export default UsersSeeder;
