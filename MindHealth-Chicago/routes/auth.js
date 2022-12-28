const express = require('express');
const authRouter = express.Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const session = require('express-session');
const flash = require('connect-flash');

authRouter.use(session({
    secret: 'PpoavJ0Dthj524sX',
    resave: true,
    saveUninitialized: true
}));

authRouter.use(flash());

authRouter.get('/login', (req, res, next) => {
    res.render('login', { layout: 'login_layout' });
});

authRouter.post('/verify', (req, res, next) => {
    //Get the User & Password from DB passed on Form
    const user = prisma.user.findFirst({
        where: {
            username: req.body.username,
        },
    });
    //Compare the User & Password from DB with Form
    if (user) {
        if (user.password === req.body.password) {
            res.redirect('/editor');
        } else {
            req.flash('error', 'Invalid Password')
            res.redirect('/login');
        }
    }
});




module.exports = authRouter;