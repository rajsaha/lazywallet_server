import {makeExecutableSchema} from 'graphql-tools';
import {resolvers} from "./resolvers";

const typeDefs = `
    type Day {
        value: String
        selected: Boolean
    }
    
    type User {
        email: String
        username: String
        password: String
    }
    
    input DayInput {
        value: String
        selected: Boolean
    }
    
    type RegularExpense {
        regExpenses: [_RegExpenses],
        count: [_count]
    }
    
    type _RegExpenses {
        _id: ID
        typeId: [Int]
        typeDesc: [String]
        amount: Int
        repeat: Boolean
        time: String
        days: [Day]
    }
    
    type _count {
        id: String
        count: Int
    }
    
    type RegularExpenseInputReturn {
        _id: ID
        typeId: ID
        userId: ID
        amount: Int
        repeat: Boolean
        time: String
        days: [Day]
        timestamp: String
    }
    
    type Query {
        getRegularExpense(pageNo: Int, size: Int, skip: Int, userId: ID): [RegularExpense]
    }
    
    input RegularExpenseInput {
        userId: ID
        typeId: ID
        amount: Int
        repeat: Boolean
        time: String
        days: [DayInput]
    }
    
    type Mutation {
        createRegularExpense(input: RegularExpenseInput): RegularExpenseInputReturn
    }`;

const schema = makeExecutableSchema({typeDefs, resolvers})

export {schema};
