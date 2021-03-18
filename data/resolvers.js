import { RegularExpenseService } from "../services/RegularExpense/RegularExpenseService";
import { ExpenseService } from "../services/Expense/ExpenseService";
import { GraphQLDateTime } from "graphql-iso-date";
import { HomeService } from "../services/Home/Home";

// resolver map
const customScalarResolver = {
  Date: GraphQLDateTime,
};

const resolvers = {
  Query: {
    // Regular Expenses
    getRegularExpenses: async (root, { pageNo, size, skip, userId }) => {
      return await RegularExpenseService.getRegularExpenses({
        pageNo,
        size,
        skip,
        userId,
      });
    },
    getRegularExpense: async (root, { id, userId }) => {
      return await RegularExpenseService.getRegularExpense({ id, userId });
    },
    // Expense / History
    getExpenses: async (root, { pageNo, size, skip, userId, period }) => {
      return await ExpenseService.getExpenses({
        pageNo,
        size,
        skip,
        userId,
        period,
      });
    },
    // Home
    getHomeData: async (root, { userId }) => {
      return await HomeService.getHomeData({ userId });
    },
    getExpenseTypes: async (root, {}) => {
      return await HomeService.getExpenseTypes();
    },
  },
  Mutation: {
    // Regular Expenses
    createRegularExpense: async (root, { input }) => {
      return await RegularExpenseService.createRegularExpense(input);
    },
    updateRegularExpense: async (root, { input }) => {
      return await RegularExpenseService.updateRegularExpense(input);
    },
    deleteRegularExpense: async (root, { input }) => {
      return await RegularExpenseService.deleteRegularExpense(input);
    },
    // Expense / History
    createExpense: async (root, { input }) => {
      return await ExpenseService.createExpense(input);
    },
    deleteExpense: async (root, { input }) => {
      return await ExpenseService.deleteExpense(input);
    },
  },
};

export { customScalarResolver, resolvers };
