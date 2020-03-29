const express = require('express');

const connectDB = require('./config/db');
const UsersRouter = require('./routes/users')
const ContactsRouter = require('./routes/contacts')
const AuthRouter = require('./routes/auth')

const app = express();
connectDB();

// init middlewear

app.use(express.json({ extended: false }))


app.get('/', (req,res) => {
    res.json({
        msg: 'Welcome to the Contact Keeper Api'
    });
})

app.use('/api/users', UsersRouter)
app.use('/api/auth', AuthRouter)
app.use('/api/contacts', ContactsRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});