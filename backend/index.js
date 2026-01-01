const express = require('express')
const userRoute = require('./src/routes/user.route');
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json());
app.use('/user', userRoute);

app.listen(port);