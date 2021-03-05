import {Expense} from "../data/models/Expense";
import mongoose from "mongoose";
import {RegExpense} from "../data/models/RegExpense";

const ExpenseService = (() => {
    const getExpenses = async (input) => {
        return new Promise((resolve, reject) => {
            try {
                // Set up pagination
                const pageNo = input.pageNo;
                const size = input.size;
                let query = {};
                if (pageNo < 0 || pageNo === 0) {
                    reject({
                        error: true,
                        message: "Invalid page number"
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
                            as: "expensetype"
                        }
                    },
                    {
                        $match: {
                            userId: mongoose.Types.ObjectId(input.userId)
                        }
                    },
                    {
                        $sort: {
                            timestamp: -1
                        }
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
                                        timestamp: 1
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
                                            $sum: 1
                                        },
                                    },
                                },
                            ],
                        },
                    },
                ]).exec((err, result) => {
                    if (err) reject({error: true, message: err.message})
                    else resolve(result);
                });
            } catch (err) {
                reject({error: true, message: err.message});
            }
        });
    }

    const createExpense = async (input) => {
        return new Promise((resolve, reject) => {
            try {
                const newExpense = new Expense({
                    typeId: input.typeId,
                    userId: input.userId,
                    title: input.title,
                    amount: input.amount,
                });

                newExpense.save((err, doc) => {
                    if (err) reject({error: true, message: err.message})
                    else resolve(doc);
                });
            } catch (err) {
                reject({error: true, message: err.message})
            }
        })
    }

    const deleteExpense = async (input) => {
        return new Promise(((resolve, reject) => {
            try {
                Expense.findOneAndRemove({_id: input.id, userId: input.userId}, (err, doc, res) => {
                    if (err) reject({error: true, message: err.message})
                    else resolve(doc);
                });
            } catch (err) {
                reject({error: true, message: err.message})
            }
        }))
    }

    return {
        getExpenses,
        createExpense,
        deleteExpense
    }
})();

export {ExpenseService};

