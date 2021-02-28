import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import indexRouter from './routes/index';
import {graphqlHTTP} from "express-graphql";
import {schema} from './data/schema';
import mongoose from 'mongoose';

// Mongodb connection string
try {
    const mongodb_connection_string = `mongodb+srv://raj:t97Z8itZW0zkcZYc@cluster0.ddnqu.mongodb.net/lazywallet?retryWrites=true&w=majority`;

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
} catch (error) {
    console.error(error);
}

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

module.exports = app;
