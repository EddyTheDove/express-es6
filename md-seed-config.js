import mongooseLib from 'mongoose'
import config from './src/config'
import Users from "./src/seeders/users.seeder"
import Categories from "./src/seeders/categories.seeder"
import Entries from "./src/seeders/entries.seeder"
import Subs from "./src/seeders/subs.seeder"

mongooseLib.Promise = global.Promise;
export const mongoose = mongooseLib;
export const mongoURL = config.mongodb || 'mongodb://localhost:27017/dbname';

export const seedersList = {
    Users,
    Categories,
    Subs,
    Entries
}
