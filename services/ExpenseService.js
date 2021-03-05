import {Expense} from "../data/models/Expense";
import mongoose from "mongoose";

const ExpenseService = (() => {
    const getExpenses = async (input) => {
        return new Promise((resolve, reject) => {
            try {
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
        deleteExpense
    }
})();

export {ExpenseService};

