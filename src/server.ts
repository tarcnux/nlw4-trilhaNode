import 'reflect-metadata';
import express, { request, response } from 'express';
import "./database";
import { router } from '../routes';
//#rumoaoproximonivel

const app = express();

app.use(express.json());
app.use(router);

app.listen(3333, () => console.log('Server is running on Port: 3333'));