import 'reflect-metadata';
import express, { request, response } from 'express';
import "./database";
//#rumoaoproximonivel

const app = express();

app.get("/", (request, response) => {
    return response.json({message: "Alo HA NLW#4 fevereiro de 2021"});
});

app.post("/", (request, response) => {
    return response.json({message: "Alo HA POST"});
});

app.listen(3333, () => console.log('Server is running on Port: 3333'));