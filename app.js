//jshint esversion:6
import express from 'express';
import ejs from "ejs";
import path from "path";
import encrypt from 'mongoose-encryption';
import connectDB from './config/db.js';
import User from './modules/user.js';

const app = express();

connectDB();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ //bodyParser substitute
    extended: true
}));

const __dirname = path.resolve();
app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {

    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });
    newUser.save();
    res.render('secrets');

});;


app.post('/login', (req, res) => {
    const username = req.body.username;
    console.log(username);
    const password = req.body.password;

    User.findOne({
        email: username
    }, (err, foundUser) => {
        console.log(foundUser);
        if (!foundUser) {
            console.log("no user was found");
        } else {
            if (password === foundUser.password) {
                res.render('secrets');
            }
        }
    });
});




let port = process.env.PORT || 3000;

app.listen(port, function (res, req) {
    console.log(`server started in port ${port}`);
});