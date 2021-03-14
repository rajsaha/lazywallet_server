import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import {graphqlHTTP} from "express-graphql";
import {schema} from './data/schema';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {loginRouter} from "./api/routes/login/Login";
import {signupRouter} from "./api/routes/signup/Signup";

dotenv.config({path: './dev.env'});
const mongodb_connection_string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.ddnqu.mongodb.net/lazywallet?retryWrites=true&w=majority`;

mongoose
    .connect(mongodb_connection_string, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to database");
    });

//! If mongodb connection fails
mongoose.connection.on("error", err => {
    console.log(`Mongoose connection error: ${err}`);
});

mongoose.set("useCreateIndex", true);

let app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// Handling CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header(
            "Access-Control-Allow-Methods",
            "PUT",
            "POST",
            "PATCH",
            "DELETE",
            "GET"
        );
        return res.status(200).json({});
    }
    next();
});

app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

export {app};
