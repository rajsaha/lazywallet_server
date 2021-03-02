import {RegularExpenseService} from "../services/RegularExpenseService";
import {GraphQLDateTime} from "graphql-iso-date";

// resolver map
const customScalarResolver = {
    Date: GraphQLDateTime,
};

const resolvers = {
    Query: {
        getRegularExpenses: async (root, {pageNo, size, skip, userId}) => {
            const _result = await RegularExpenseService.getRegularExpenses({pageNo, size, skip, userId});
            return _result;
        },
        getRegularExpense: async (root, {id, userId}) => {
            const _result = await RegularExpenseService.getRegularExpense({id, userId});
            return _result;
        },
    },
    Mutation: {
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
        }
    },
};

export {customScalarResolver, resolvers};
