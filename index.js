require('dotenv').config();

const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true, useUnifiedTopology: true  });

const port = process.env.PORT || 4000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const todoRoute = require('./routes/todos.route');
const bookRoute = require('./routes/book.route');
const userRoute = require('./routes/user.route');
const transactionRoute = require('./routes/transaction.route');
const authRoute = require('./routes/auth.route');
const profileRoute = require('./routes/profile.route');
const rentRoute = require('./routes/rent.route');

//api
const loginApi = require('./api/routes/auth.route');
const transactionApi = require('./api/routes/transaction.route');
const rentApi = require('./api/routes/rent.route');
const bookApi = require('./api/routes/book.route');

const rentCount = require('./middleware/rentCount.middleware');
const authMiddleware = require('./middleware/auth.middleware');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SECRET_KEY));
app.use(express.static('public'))
app.set('views', './views');
app.set('view engine', 'pug');
//api
app.use('/api/login', loginApi);
app.use('/api/transactions', transactionApi);
app.use('/api/rents', rentApi);
app.use('/api/books', bookApi);


//
app.use(rentCount);
app.use('/auth', authRoute);
app.use('/books', bookRoute);
app.use('/rent', rentRoute);
app.use(authMiddleware);
app.use('/todos', todoRoute);
app.use('/users', userRoute);
app.use('/transactions', transactionRoute);
app.use('/profile', profileRoute);

app.get('/', (request, response) => {
  response.send('I love CodersX');
});
// listen for requests :)
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
