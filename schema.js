import {buildSchema} from 'graphql';
const schema = buildSchema(`
    type Day {
        value: String
        selected: Boolean
    }
    
    type ExpenseType {
        id: ID
        desc: String
    }
    
    type RegularExpense {
        id: ID
        type: ExpenseType
        amount: Float
        repeat: Boolean
        time: String
        days: [Day]
    }
    
    type Query {
        regularExpenses: RegularExpense
    }`
);

export default schema;