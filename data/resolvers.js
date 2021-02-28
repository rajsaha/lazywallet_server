import {RegularExpenseService} from "../services/RegularExpenseService";

// resolver map
export const resolvers = {
    Query: {
        getRegularExpense: async (root, {pageNo, size, skip, userId}) => {
            const _result = await RegularExpenseService.getRegularExpenses({pageNo, size, skip, userId});
            return _result;
        },
    },
    Mutation: {
        createRegularExpense: async (root, {input}) => {
            const _result = await RegularExpenseService.createRegularExpense(input);
            return _result;
        },
    },
};
