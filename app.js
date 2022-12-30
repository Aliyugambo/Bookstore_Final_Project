const express = require("express");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit")
const CONFIG = require("./config/config");
const logger = require("./loging/logger");
con
// SECURITY MIDDLEWARE
const helmet = require('helmet')
//Routes
const bookRouter = require("./routes/books.routes");
const authorRouter = require("./routes/author.routes")
const connectToDb = require("./db/mongodb");


const app = express();


// CONNECTING TO MONGODB

connectToDb();

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	store: new MemoryStore(),
})

// Apply the rate limiting middleware to API calls only
app.use('/api', apiLimiter);

// SECURITY MIDDLEWARE
app.use(helmet())


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/v1/books", bookRouter);
app.use("/api/v1/authors", authorRouter);

app.get('/', function (req, res) {
  res.send('Hello World');
});


// ERROR HANDULLER MEDDLE WARE
app.use((err, req, res, next)=>{
  logger.error(err.message);
  const errorStatus = err.status || 500;
  res.status(errorStatus).send(err.message);
  next();
})


app.listen(CONFIG.PORT, ()=>{
  logger.info(`Server Start at http://localhost:${CONFIG.PORT}`);
});