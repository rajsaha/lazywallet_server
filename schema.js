import {buildSchema} from 'graphql';
const schema = buildSchema(`
    type Day {
        value: String
        selected: Boolean
    }
    
    input DayInput {
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
        amount: Int
        repeat: Boolean
        time: String
        days: [Day]
    }
    
    type Query {
        getRegularExpense(id: ID): RegularExpense
    }
    
    input ExpenseTypeInput {
        id: ID
        desc: String
    }
    
    input RegularExpenseInput {
        id: ID
        type: ExpenseTypeInput
        amount: Int
        repeat: Boolean
        time: String
        days: [DayInput]
    }
    
    type Mutation {
        createRegularExpense(input: RegularExpenseInput): RegularExpense
    }`
);

export default schema;
