import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import userRouter from './routes/user.routes';
import ConnectDb from './db/db';
import errorHandler from './util/middlewares/errorhandler';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => {
    res.send('Hello World! are you ready');
});

app.use('/api/user',userRouter);


app.use(errorHandler);

ConnectDb().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server started at http://localhost:${process.env.PORT}`);
    })
}).catch(err=>{
    console.log("Failed to start Server");
    console.log(err);
})