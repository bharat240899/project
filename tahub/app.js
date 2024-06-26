const express = require('express')
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors=require('cors')
const expressValidator = require('express-validator')
require('dotenv').config()
//import routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const postingRoutes = require('./routes/postings')
const applicationRoutes = require('./routes/form')
//app 
const app = express()
//db 

// load env variables

//db connection
mongoose.connect(
  process.env.DATABASE,
  { useNewUrlParser: true, useUnifiedTopology: true ,family:4,},
)
  .then(() => console.log('DB Connected'))

mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`)
});

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());


//routes midddleware()
app.use("/api", authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);
app.use("/api",postingRoutes);
app.use("/api",applicationRoutes);

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})