import express from "express";
const app=express();
app.use(express.json());

//import routes
import userRouter from './routes/user.route.js';

//declares routes
app.use("/api/v1/users",userRouter);


export default app;
