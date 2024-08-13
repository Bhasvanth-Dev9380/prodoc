import express from "express"
import cors from "cors"
import session from "express-session";
import MongoStore from "connect-mongo";

const app = express()

app.use(session({
    secret: "jkdkjbkhbdkhqwb", 
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: "mongodb://localhost:27017/Project" }), 
    cookie: {
      secure: false, 
      maxAge: 24 * 60 * 60 * 1000 
    }
  }));

app.use(cors({
    origin: ['http://localhost:5173','http://localhost:5174'], // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  }));

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))


//route import
import userRouter from "./routes/user.routes.js"


//routes declaration

app.use("/api/v1/user",userRouter)
// http://localhost:8080/api/v1/user

export { app }