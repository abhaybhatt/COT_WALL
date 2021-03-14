import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
//const CONNECTION_URL = "mongodb+srv://abhay:godk9@cluster0.jfyca.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const CONNECTION_URL="mongodb://localhost:27017/memories"

app.use(bodyParser.json({ limit:"30mb" , extended:true}));
app.use(bodyParser.urlencoded({ limit:"30mb" , extended:true}));
app.use(cors());
app.use('/posts',postRoutes);
app.use('/user',userRoutes);


mongoose.connect(process.env.CONNECTION_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    app.listen(PORT,()=> console.log(`server running at ${PORT}`))
}).catch((err) => console.log(err.message));


mongoose.set('useFindAndModify',false);



