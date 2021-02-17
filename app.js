import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import indexRouter from './routes/index';

let app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

module.exports = app;
