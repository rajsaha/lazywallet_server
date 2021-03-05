import {Expense} from "../data/models/Expense";
import mongoose from "mongoose";

const HomeService = (() => {
    const getHomeData = async (input) => {
        return new Promise(async (resolve, reject) => {
            try {
                let spentToday = 0;
                let spentThisMonth = 0;
                let spentMostOn = "";

                // Today
                const _result_spentToday = await Expense.aggregate([
                    {
                        $match: {
                            userId: mongoose.Types.ObjectId(input.userId),
                            timestamp: {
                                $lt: new Date(),
                                $gte: new Date(new Date().setDate(new Date().getDate()-1))
                            },
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            total: {$sum: "$amount"}
                        }
                    },
                ]);

                spentToday = _result_spentToday[0].total;

                // This month
                const _result_spentThisMonth = await Expense.aggregate([
                    {
                        $match: {
                            userId: mongoose.Types.ObjectId(input.userId),
                            timestamp: {
                                $lt: new Date(),
                                $gte: new Date(new Date().setDate(new Date().getDate()-30))
                            },
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            total: {$sum: "$amount"}
                        }
                    },
                ]);

                spentThisMonth = _result_spentThisMonth[0].total;

                // Spent most on
                const _result_spentMostOn = await Expense.aggregate([
                    {
                        $match: {
                            userId: mongoose.Types.ObjectId(input.userId),
                        }
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
                        $group: {
                            _id: "$typeId",
                            typeDesc: {$first: "$expensetype.typeDesc"},
                            count: {$sum: 1}
                        }
                    },
                ]);

                spentMostOn = _result_spentMostOn[0].typeDesc[0];

                resolve({
                    spentToday: spentToday,
                    spentThisMonth: spentThisMonth,
                    spentMostOn: spentMostOn
                });
            } catch (err) {
                reject({error: true, message: err.message});
            }
        });
    }

    return {
        getHomeData,
    }
})();

export {HomeService};

