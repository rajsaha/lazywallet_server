import mongoose from 'mongoose';

const RegExpenseSchema = new mongoose.Schema({
    typeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ExpenseType",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    repeat: {
        type: Boolean,
        default: false
    },
    time: {
        type: String,
        default: "12:00"
    },
    days: {
        type: Array,
        default: [
            {value: 'mon', selected: false},
            {value: 'tue', selected: false},
            {value: 'wed', selected: false},
            {value: 'thu', selected: false},
            {value: 'fri', selected: false},
            {value: 'sat', selected: false},
            {value: 'sun', selected: false},
        ]
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
});


const RegExpense = mongoose.model('RegExpense', RegExpenseSchema);
export {RegExpense};
