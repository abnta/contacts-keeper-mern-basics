const express = require('express');
const UsersRouter = require('./routes/users')
const ContactsRouter = require('./routes/contacts')
const AuthRouter = require('./routes/auth')

const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req,res) => {
    res.json({
        msg: 'Welcome to the Contact Keeper Api'
    });
})

app.use('/api/users', UsersRouter)
app.use('/api/auth', AuthRouter)
app.use('/api/contacts', ContactsRouter)

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});