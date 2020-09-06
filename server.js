const express = require('express');
const connectDB = require('./config/db');
const app = express();


//connect to database 
connectDB();

app.get('/',(req, res) => res.send('API Running') );

//middleware 
app.use(express.json({ extended: false }));

app.use('/api/users', require('./routes/user'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/messages', require('./routes/messages'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server is running '));
