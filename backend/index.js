require('express-async-errors');
const express = require('express');
const cors = require('cors');
require('./db/config');
const errorHandler = require('./middleware/errorHandler');

const app = express();

/* adding middlware*/
app.use(express.json());
app.use(cors());

app.use('/', require('./routes/authRoutes'));
app.use('/auth', require('./routes/userRoutes'));
app.use('/media', require('./routes/mediaRoutes'));
app.use('/plans', require('./routes/planRoutes'));
app.use('/transactions', require('./routes/transactionRoutes'));
app.use('/keys', require('./routes/keysRoutes'));

app.use(errorHandler);

app.listen(5000, () => console.log('Server is up and running'));
