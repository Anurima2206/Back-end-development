require("dotenv").config();
const dotenv=require("dotenv");
const express=require("express");
const cors=require("cors");
const morgan=require("morgan");

const connectDb = require("./config/db.js");


//rest object
const app=express();

//dotenv config
dotenv.config();

//db connection
connectDb();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//route
app.use('/api/v1/test',require("./routes/testRoutes.js"));
app.use('/api/v1/auth',require("./routes/authRoutes.js"));
app.use('/api/v1/user',require("./routes/userRoutes.js"));
app.use('/api/v1/restaurant',require("./routes/restaurantRoutes.js"));
app.use('/api/v1/category',require("./routes/categoryRoutes.js"));
app.use('/api/v1/food',require("./routes/foodRoutes.js"));
app.get("/",(req,res)=>{
    return res.status(200).send("<h1>Welcome to Food Server API project</h1>");
});
//port
const PORT=process.env.PORT||5000;

//listen
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
});