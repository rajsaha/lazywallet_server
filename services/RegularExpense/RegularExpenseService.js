import { RegExpense } from "../../data/models/RegExpense";
import mongoose from "mongoose";

const RegularExpenseService = (() => {
  const getRegularExpense = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {
        RegExpense.aggregate([
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
              _id: mongoose.Types.ObjectId(input.id),
              userId: mongoose.Types.ObjectId(input.userId),
            },
          },
          {
            $project: {
              _id: 1,
              typeId: "$expensetype.typeId",
              typeDesc: "$expensetype.typeDesc",
              title: 1,
              amount: 1,
              repeat: 1,
              time: 1,
              days: 1,
              timestamp: 1,
            },
          },
        ]).exec((err, result) => {
          if (err) reject({ error: true, message: err.message });
          else resolve(result);
        });
      } catch (err) {
        reject({ error: true, message: err.message });
      }
    });
  };

  const deleteRegularExpense = async (input) => {
    return new Promise((resolve, reject) => {
      try {
        RegExpense.findOneAndRemove(
          { _id: input.id, userId: input.userId },
          (err, doc, res) => {
            if (err) reject({ error: true, message: err.message });
            else resolve(doc);
          }
        );
      } catch (err) {
        reject({ error: true, message: err.message });
      }
    });
  };

  const updateRegularExpense = async (input) => {
    return new Promise((resolve, reject) => {
      try {
        RegExpense.findOneAndUpdate(
          { _id: input.id, userId: input.userId },
          input,
          { new: true },
          (err, res) => {
            if (err) reject({ error: true, message: err.message });
            else resolve(res);
          }
        );
      } catch (err) {
        reject({ error: true, message: err.message });
      }
    });
  };

  const createRegularExpense = async (input) => {
    return new Promise((resolve, reject) => {
      try {
        const newRegExpense = new RegExpense({
          typeId: input.typeId,
          userId: input.userId,
          title: input.title,
          amount: input.amount,
          repeat: input.repeat,
          time: input.time,
          days: input.days,
        });

        newRegExpense.save((err, doc) => {
          if (err) reject({ error: true, message: err.message });
          else resolve(doc);
        });
      } catch (err) {
        reject({ error: true, message: err.message });
      }
    });
  };

  const getRegularExpenses = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {
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

        RegExpense.aggregate([
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
            },
          },
          {
            $sort: {
              timestamp: -1,
            },
          },
          {
            $facet: {
              regExpenses: [
                {
                  $project: {
                    _id: 1,
                    typeId: 1,
                    typeDesc: "$expensetype.typeDesc",
                    title: 1,
                    amount: 1,
                    repeat: 1,
                    time: 1,
                    days: 1,
                    timestamp: 1,
                  },
                },
                {
                  $skip: query.skip,
                },
                {
                  $limit: query.limit,
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
            },
          },
        ]).exec((err, result) => {
          if (err) reject({ error: true, message: err.message });
          else resolve(result);
        });
      } catch (err) {
        reject({ error: true, message: err.message });
      }
    });
  };

  return {
    getRegularExpense,
    deleteRegularExpense,
    updateRegularExpense,
    createRegularExpense,
    getRegularExpenses,
  };
})();

export { RegularExpenseService };
