import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import indexRouter from './routes/index';
import {graphqlHTTP} from "express-graphql";
import schema from './schema';

let app = express();
const root = { regularExpenses: () => {
        return {
            type: {
                id: 0,
                desc: "Test"
            },
            amount: 25.5,
            repeat: true,
            time: "10:30",
            days: [
                {value: 'mon', selected: true},
                {value: 'tue', selected: false},
                {value: 'wed', selected: false},
                {value: 'thu', selected: false},
                {value: 'fri', selected: false},
                {value: 'sat', selected: false},
                {value: 'sun', selected: false},
            ]
        }
    }};

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
}));

module.exports = app;
