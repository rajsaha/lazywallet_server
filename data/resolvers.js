import {RegularExpenseService} from "../services/RegularExpenseService";
import {ExpenseService} from "../services/ExpenseService";
import {GraphQLDateTime} from "graphql-iso-date";
import {HomeService} from "../services/Home";

// resolver map
const customScalarResolver = {
    Date: GraphQLDateTime,
};

const resolvers = {
    Query: {
        // Regular Expenses
        getRegularExpenses: async (root, {pageNo, size, skip, userId}) => {
            const _result = await RegularExpenseService.getRegularExpenses({pageNo, size, skip, userId});
            return _result;
        },
        getRegularExpense: async (root, {id, userId}) => {
            const _result = await RegularExpenseService.getRegularExpense({id, userId});
            return _result;
        },
        // Expense / History
        getExpenses: async (root, {pageNo, size, skip, userId, period}) => {
            const _result = await ExpenseService.getExpenses({pageNo, size, skip, userId, period});
            return _result;
        },
        // Home
        getHomeData: async (root, {userId}) => {
            const _result = await HomeService.getHomeData({userId});
            return _result;
        }
    },
    Mutation: {
        // Regular Expenses
        createRegularExpense: async (root, {input}) => {
            const _result = await RegularExpenseService.createRegularExpense(input);
            return _result;
        },
        updateRegularExpense: async (root, {input}) => {
            const _result = await RegularExpenseService.updateRegularExpense(input);
            return _result;
        },
        deleteRegularExpense: async (root, {input}) => {
            const _result = await RegularExpenseService.deleteRegularExpense(input);
            return _result;
        },
        // Expense / History
        createExpense: async (root, {input}) => {
            const _result = await ExpenseService.createExpense(input);
            return _result;
        },
        deleteExpense: async (root, {input}) => {
            const _result = await ExpenseService.deleteExpense(input);
            return _result;
        }
    },
};

export {customScalarResolver, resolvers};
