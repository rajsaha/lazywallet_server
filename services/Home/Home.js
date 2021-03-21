import { Expense } from "../../data/models/Expense";
import { ExpenseType } from "../../data/models/ExpenseType";
import mongoose from "mongoose";
import { GeneralUtils } from "../../utils/GeneralUtils";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

const HomeService = (() => {
  dayjs.extend(utc);
  const getHomeData = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {
        let spentToday;
        let spentThisMonth;
        let spentMostOn;
        const month = dayjs().get("month") + 1;
        const year = dayjs().get("year");
        const daysInMonth = dayjs().daysInMonth();
        const startString = `${year}-${month}-01`;
        const endString = `${year}-${month}-${daysInMonth}`;
        const startOfMonthDate = dayjs.utc(startString).toDate();
        const endOfMonthDate = dayjs.utc(endString).toDate();
        
        // Today
        const _result_spentToday = await Expense.aggregate([
          {
            $match: {
              userId: mongoose.Types.ObjectId(input.userId),
              timestamp: {
                $lt: new Date(),
                $gte: new Date(new Date().setDate(new Date().getDate() - 1)),
              },
            },
          },
          {
            $group: {
              _id: null,
              total: {
                $sum: "$amount",
              },
            },
          },
        ]);

        spentToday = GeneralUtils.isArrayEmpty(_result_spentToday)
          ? _result_spentToday[0].total
          : 0;

        // This month
        const _result_spentThisMonth = await Expense.aggregate([
          {
            $match: {
              userId: mongoose.Types.ObjectId(input.userId),
              timestamp: {
                $lt: endOfMonthDate,
                $gte: startOfMonthDate,
              },
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$amount" },
            },
          },
        ]);

        spentThisMonth = GeneralUtils.isArrayEmpty(_result_spentThisMonth)
          ? _result_spentThisMonth[0].total
          : 0;

        // Spent most on
        const _result_spentMostOn = await Expense.aggregate([
          {
            $match: {
              userId: mongoose.Types.ObjectId(input.userId),
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
            $group: {
              _id: "$typeId",
              typeDesc: { $first: "$expensetype.typeDesc" },
              count: { $sum: "$amount" },
            },
          },
          {$sort: {count: -1}},
        ]);

        spentMostOn = GeneralUtils.isArrayEmpty(_result_spentMostOn)
          ? _result_spentMostOn[0].typeDesc[0]
          : "n/a";

        resolve({
          spentToday: spentToday,
          spentThisMonth: spentThisMonth,
          spentMostOn: spentMostOn,
        });
      } catch (err) {
        reject({ error: true, message: err.message });
      }
    });
  };

  const getExpenseTypes = async () => {
    return new Promise((resolve, reject) => {
      try {
        ExpenseType.aggregate([
          {
            $project: {
              typeId: 1,
              typeDesc: { $toUpper: "$typeDesc" },
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
    getHomeData,
    getExpenseTypes,
  };
})();

export { HomeService };
