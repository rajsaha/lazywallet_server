import {makeExecutableSchema} from 'graphql-tools';
import {customScalarResolver, resolvers} from "./resolvers";
import {Fragment_RegularExpense} from "./schemaTypeDefFragments/TypeDef_Fragment_RegularExpense";
import {Fragment_User} from "./schemaTypeDefFragments/TypeDef_Fragment_User";
import {Fragment_Expense} from "./schemaTypeDefFragments/TypeDef_Fragment_Expense";
import {Fragment_Home} from "./schemaTypeDefFragments/TypeDef_Fragment_Home";
import {Fragment_ExpenseType} from "./schemaTypeDefFragments/TypeDef_Fragment_ExpenseType";

const typeDefs = `
    scalar Date
    
    ${Fragment_Expense}
    ${Fragment_RegularExpense}
    ${Fragment_User}
    ${Fragment_Home}
    ${Fragment_ExpenseType}
    
    type Query {
        getRegularExpenses(pageNo: Int, size: Int, skip: Int, userId: ID): [RegularExpenses]
        getRegularExpense(id: ID, userId: ID): [_RegExpense]
        getExpenses(pageNo: Int, size: Int, skip: Int, userId: ID, period: String): [Expenses]
        getHomeData(userId: ID): HomeData
        getExpenseTypes: [ExpenseType]
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
