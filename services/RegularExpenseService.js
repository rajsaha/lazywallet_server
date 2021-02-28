import {RegExpense} from "../data/models/RegExpense";
import mongoose from "mongoose";

const RegularExpenseService = (() => {
    const createRegularExpense = async (input) => {
        return new Promise(((resolve, reject) => {
            try {
                const newRegExpense = new RegExpense({
                    typeId: input.typeId,
                    userId: input.userId,
                    amount: input.amount,
                    repeat: input.repeat,
                    time: input.time,
                    days: input.days
                });

                newRegExpense.save((err, doc) => {
                    if (err) {
                        reject({
                            error: true,
                            message: err.message
                        });
                    } else {
                        resolve(doc);
                    }
                });
            } catch (err) {
                reject({
                    error: true,
                    message: err.message
                })
            }
        }));
    }

    const getRegularExpenses = async (input) => {
        return new Promise((async (resolve, reject) => {
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

                const regExpenses = await RegExpense
                    .aggregate([
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
                                regExpenses: [
                                    {
                                        $project: {
                                            _id: 1,
                                            typeId: "$expensetype.typeId",
                                            typeDesc: "$expensetype.typeDesc",
                                            amount: 1,
                                            repeat: 1,
                                            time: 1,
                                            days: 1
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
                    ])
                    .exec();
                resolve(regExpenses);
            } catch (err) {
                reject({
                    error: true,
                    message: err.message
                });
            }
        }));
    }

    return {
        createRegularExpense,
        getRegularExpenses
    }
})();

export {RegularExpenseService};
