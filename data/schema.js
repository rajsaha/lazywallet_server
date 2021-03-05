import {makeExecutableSchema} from 'graphql-tools';
import {customScalarResolver, resolvers} from "./resolvers";
import {Fragment_RegularExpense} from "./schemaTypeDefFragments/TypeDef_Fragment_RegularExpense";
import {Fragment_User} from "./schemaTypeDefFragments/TypeDef_Fragment_User";
import {Fragment_Expense} from "./schemaTypeDefFragments/TypeDef_Fragment_Expense";

const typeDefs = `
    scalar Date
    
    ${Fragment_Expense}
    ${Fragment_RegularExpense}
    ${Fragment_User}
    type Query {
        getRegularExpenses(pageNo: Int, size: Int, skip: Int, userId: ID): [RegularExpenses]
        getRegularExpense(id: ID, userId: ID): [_RegExpense]
        getExpenses(pageNo: Int, size: Int, skip: Int, userId: ID): [Expenses]
    }
    
    type Mutation {
        createRegularExpense(input: _New_RegularExpenseInput): RegularExpenseInputReturn
        updateRegularExpense(input: _Update_RegularExpenseInput): RegularExpenseInputReturn
        deleteRegularExpense(input: _Delete_RegularExpenseInput): RegularExpenseInputReturn
        createExpense(input: _New_ExpenseInput): ExpenseInputReturn
        deleteExpense(input: _Delete_ExpenseInput): ExpenseInputReturn
    }`;

const schema = makeExecutableSchema({typeDefs, resolvers: [customScalarResolver, resolvers]})

export {schema};
