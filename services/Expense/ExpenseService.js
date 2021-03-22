import { Expense } from "../../data/models/Expense";
import mongoose from "mongoose";

const ExpenseService = (() => {
  const getExpenses = async (input) => {
    return new Promise((resolve, reject) => {
      try {
        // Time
        let timestamp;
        switch (input.period) {
          case "today":
            timestamp = {
              $lt: new Date(),
              $gte: new Date(new Date().setDate(new Date().getDate() - 1)),
            };
            break;
          case "last_seven_days":
            timestamp = {
              $lt: new Date(),
              $gte: new Date(new Date().setDate(new Date().getDate() - 7)),
            };
            break;
          case "last_thirty_days":
            timestamp = {
              $lt: new Date(),
              $gte: new Date(new Date().setDate(new Date().getDate() - 30)),
            };
            break;
          case "everything":
            timestamp = {
              $lt: new Date(),
            };
            break;
          default:
            timestamp = {
              $lt: new Date(),
            };
            break;
        }
        // Set up pagination
        const pageNo = input.pageNo;
        const size = input.size;
        let query = {};
        if (pageNo < 0 || pageNo === 0) {
          reject({
            error: true,
            message: "Invalid page number",
          });
        }
        query.skip = size * (pageNo - 1);
        query.limit = size;

        Expense.aggregate([
          {
            $lookup: {
              from: "users",
              localField: "userId",
              foreignField: "_id",
              as: "user",
            },
          },
          {
            $lookup: {
              from: "expensetypes",
              localField: "typeId",
              foreignField: "_id",
              as: "expensetype",
            },
          },
          {
            $match: {
              userId: mongoose.Types.ObjectId(input.userId),
              timestamp: timestamp,
            },
          },
          {
            $sort: {
              timestamp: -1,
            },
          },
          {
            $facet: {
              expenses: [
                {
                  $project: {
                    _id: 1,
                    typeId: "$expensetype.typeId",
                    typeDesc: "$expensetype.typeDesc",
                    title: 1,
                    amount: 1,
                    timestamp: 1,
                    dateCreatedAt: 1,
                    doc: "$$ROOT",
                  },
                },
                {
                  $skip: query.skip,
                },
                {
                  $limit: query.limit,
                },
                {
                  $group: {
                    _id: "$dateCreatedAt",
                    records: { $push: "$$ROOT" },
                  },
                },
                {
                  $sort: {
                    day: -1,
                  },
                },
              ],
              count: [
                {
                  $match: {
                    userId: mongoose.Types.ObjectId(input.userId),
                  },
                },
                {
                  $group: {
                    _id: null,
                    count: {
                      $sum: 1,
                    },
                  },
                },
              ],
              total: [
                {
                  $match: {
                    userId: mongoose.Types.ObjectId(input.userId),
                  },
                },
                {
                  $group: {
                    _id: null,
                    total: { $sum: "$amount" },
                  },
                },
              ],
              dates: [
                {
                  $match: {
                    userId: mongoose.Types.ObjectId(input.userId),
                  },
                },
                {
                  $group: {
                    _id: "$dateCreatedAt",
                  },
                },
              ],
            },
          },
        ]).exec((err, result) => {
          if (err) {
            reject({ error: true, message: err.message });
          } else {
            resolve(result);
          }
        });
      } catch (err) {
        reject({ error: true, message: err.message });
      }
    });
  };

  const createExpense = async (input) => {
    return new Promise((resolve, reject) => {
      try {
        const year = new Date().getUTCFullYear();
        const month = new Date().getUTCMonth() + 1;
        const day = new Date().getDate();

        const newExpense = new Expense({
          typeId: input.typeId,
          userId: input.userId,
          title: input.title,
          amount: input.amount,
          dateCreatedAt: new Date(Date.UTC(year, month, day, 0, 0, 0, 0))
        });

        newExpense.save((err, doc) => {
          if (err) reject({ error: true, message: err.message });
          else resolve(doc);
        });
      } catch (err) {
        reject({ error: true, message: err.message });
      }
    });
  };

  const deleteExpense = async (input) => {
    return new Promise((resolve, reject) => {
      try {
        Expense.findOneAndRemove(
          { _id: input.id, userId: input.userId },
          (err, doc) => {
            if (err) reject({ error: true, message: err.message });
            else resolve(doc);
          }
        );
      } catch (err) {
        reject({ error: true, message: err.message });
      }
    });
  };

  return {
    getExpenses,
    createExpense,
    deleteExpense,
  };
})();

export { ExpenseService };
