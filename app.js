import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import indexRouter from './routes/index';
import {graphqlHTTP} from "express-graphql";
import {schema} from './data/schema';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({path: './dev.env'});
const mongodb_connection_string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.ddnqu.mongodb.net/lazywallet?retryWrites=true&w=majority`;

mongoose
    .connect(mongodb_connection_string, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(res => {
        console.log("Connected to database");
    });

//! If mongodb connection fails
mongoose.connection.on("error", err => {
    console.log(`Mongoose connection error: ${err}`);
});

mongoose.set("useCreateIndex", true);

let app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/', indexRouter);

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

export {app};
