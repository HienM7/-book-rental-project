// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const sessionMiddleware = require('./middleware/session.middleware');
const countSessionMiddleware = require('./middleware/countSession.middleware');
const authMiddleware = require('./middleware/auth.middleware');

const todoRoute = require('./routes/todos.route');
const bookRoute = require('./routes/book.route');
const userRoute = require('./routes/user.route');
const transactionRoute = require('./routes/transaction.route');
const authRoute = require('./routes/auth.route');
const profileRoute = require('./routes/profile.route');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser("SECRET_KEY"));
app.use(express.static('public'))
app.set('views', './views');
app.set('view engine', 'pug');
// https://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
  response.send('I love CodersX');
});
app.use(sessionMiddleware);
app.use(countSessionMiddleware);

app.use('/auth', authRoute);
app.use(authMiddleware);
app.use('/todos', todoRoute);
app.use('/books', bookRoute);
app.use('/users', userRoute);
app.use('/transactions', transactionRoute);
app.use('/profile', profileRoute);


// listen for requests :)
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
