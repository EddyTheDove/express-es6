import moment from 'moment'
import { Entry } from '../models'

const monthly = async (req, res, next) => {

    const date = req.params.date
    const startOfMonth = moment(date).startOf('month').toDate()
    const endOfMonth = moment(date).endOf('month').toDate()

    try {
        let result = { income: [], expenses: [] }

        const entries = await Entry.find({
            date: {
                $gt: startOfMonth,
                $lte: endOfMonth
            }
        })
        .where('owner').equals(req.user._id)
        .select('amount type')
        .populate('sub', 'name')
        .populate('category', 'name colour')
        .exec()

        if (entries.length) {
            result.income = entries.filter(e => e.type == 'income')
            result.expenses = entries.filter(e => e.type == 'expense')
        }

        res.json(result)
    }
    catch (error) {
        console.log('Query error => ', e)
        return res.status(500).json(e)
    }
}


export const StatController = { monthly }
