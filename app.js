require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser');
const _ = require('lodash')
const mongoose = require('mongoose');
const session = require('express-session')
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate')
const flash = require('connect-flash');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


// Initiallize Usage
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Connect Mongoose
mongoose.connect("mongodb://localhost:27017/sixinternsDB", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);


// Mongoose Schemas
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

const profileSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    profession: String,
    mobile_no: String,
    city: String,
    state: String,
});



// Plugins
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(findOrCreate);


// Mongoose Models
const User = new mongoose.model('User', userSchema);
const Profile = new mongoose.model('Profile', profileSchema);

// Passport Intialize
passport.use(User.createStrategy());
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});

// Use Passport Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/sixinterns",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
    function (accessToken, refreshToken, profile, cb) {
        User.findOne({ 'email': profile.emails[0].value }, function (err, user) {
            if (err) {
                return cb(err);
            }
            // No User was found- Create One
            if (!user) {
                user = new User({
                    username: profile.displayName,
                    email: profile.emails[0].value,
                    password: null,
                    provider: 'Google',
                    // Now in the future searching of User.findOne({'google.id': profile.id } will match because of this next line
                    google: profile._json
                })
                user.save(function (err) {
                    if (err) console.log(err);
                    return cb(err, user);
                });
            } else {
                // foundUser return
                return cb(err, user);
            }
        });
    }
));



// ______________________________________________________ //
// Routes Get-Req
app.get(['/', '/home'], function (req, res) {
    res.render('home',{pageTitle:'Sixinterns - Never Work For Free'});
})

app.get('/internships', function (req, res) {
    res.render('internships',{pageTitle:'Internships - Sixinterns'});
})

app.get('/campus-ambassador', function (req, res) {
    res.render('campus-ambassador',{pageTitle:'Campus Ambassador - Sixinterns'});
})

app.get('/about', function (req, res) {
    res.render('about', {pageTitle:'About Us - Sixinterns'});
})

app.get('/contact', function (req, res) {
    res.render('contact',{pageTitle:'Contact Us - Sixinterns'});
})

app.get('/login', function (req, res) {
    res.render('login',{pageTitle: 'Login - Sixinterns'});
});

app.get('/register', function (req, res) {
    res.render('register',{pageTitle: 'Register - Sixinterns'});
});

app.get('/logout', function (req, res) {
    req.logout;
    res.redirect('/login');
})

app.get('/dashboard', function (req, res) {
    if (req.isAuthenticated()) {
        Profile.findOne({userId: req.user._id}, function (err, foundUser) {
            if (!err) {
                if (!foundUser) {
                    const currentUserProfile = new Profile({
                        userId: req.user._id,
                        profession: ' ',
                        mobile_no: ' ',
                        city: ' ',
                        state: ' ',
                    });
                    currentUserProfile.save();
                    res.redirect('/dashboard');
                } else if (foundUser) {
                    res.render('dashboard', { pageTitle:'Dashboard' ,username: req.user.username, userprofession: foundUser.profession, useremail: req.user.email, mobile_no: foundUser.mobile_no, city: foundUser.city, state: foundUser.state });
                }
            }
        });
    } else {
        res.redirect('/login');
    }
});

app.get('/edit-profile', function (req, res) {
    Profile.findOne({userId: req.user._id}, function (err, foundUser) {
        if (foundUser) {
            res.render('edit-profile', {username: req.user.username, profession: foundUser.profession, useremail: req.user.email, mobile_no: foundUser.mobile_no, city: foundUser.city, state: foundUser.state });
        }else{
            console.log('notfound');            
        }

    });
});


// _______________________________________________________ //
// Google SignIn Route
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/sixinterns',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect dashboard.
        console.log(req.user);
        res.redirect('/dashboard');
    });



// ______________________________________________________ //
// Routes Post-Req

app.post('/edit-profile', function (req, res) {
    Profile.findOneAndUpdate({ userId: req.user._id }, {profession: req.body.profession, mobile_no: req.body.mobile_no, city: req.body.city, state: req.body.state }, function (err, foundUser) {
        if (err) console.log(err);
        else {
            console.log(foundUser);
            res.redirect('/dashboard');
        }
    });

});

app.post('/login', function (req, res) {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    })
    req.login(user, function (err) {
        if (err) {
            console.log(err);
        } else if (!err) {
            passport.authenticate('local')(req, res, function () {
                res.redirect('/dashboard');
            });
        }
    })
});

app.post('/register', function (req, res) {
    User.register({ username: req.body.username, email: req.body.email }, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            res.redirect('/register');
        } else {
            passport.authenticate('local')(req, res, function () {
                res.redirect('/dashboard');
            });
        }
    });
});


// Listen To Port process.env or 3000
app.listen(3000, function () {
    console.log('Server Started At port 3000');
});