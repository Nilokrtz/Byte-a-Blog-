import express from 'express';
import connectDataBase from './src/database/db.js'; 
import userRoute from './src/routes/user.route.js';
import authRoute from './src/routes/auth.route.js';
import postRoute from './src/routes/post.route.js';
import dotenv from 'dotenv';

const app = express();
const port = process.env.PORT || 3000;
dotenv.config();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

connectDataBase();

app.use(express.json());
app.use('/user', userRoute);
app.use('/auth', authRoute);
app.use('/post', postRoute);

app.listen(port);