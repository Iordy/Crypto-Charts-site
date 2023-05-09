
const express = require('express');

const {cwd} = require('process');

const path = require('path');

const fs = require('fs');

const app = express();

app.use(express.json());

const bcrypt = require('bcrypt');

const users  = [];

app.use(express.urlencoded({ extended: false }));


app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
   
    res.render('index');

    }
);


app.get('/watchlist', (req, res) => {

    res.render('watchlist');

    }
);


app.get('/register', (req, res) => {

    res.render('register');

    console.log(users);

}); 


app.post('/register', async (req, res, next) => {

    const user = {
        id: Date.now().toString(),
        username: req.body.username,
        email: req.body.email
    }
    
    users.push(user);

    fs.writeFile('users.json', JSON.stringify(user), {flag: "a"}, (err) => {

        if (err) {
            console.log(err);
        }


    });
  
    res.redirect('/login');

  });


app.get('/login', async (req, res) => {

    res.render('login');

    const user = users.find(user => user.username === req.body.username);
    if (user == null) {
        return res.status(400).send('Cannot find user');
    }

    try {

        if (await bcrypt.compare(req.body.password, user.password)) {

            res.send('Success');

        } else {

            res.send('Not Allowed');

        }

    }
    catch {

        res.status(500).send();

    }

});






app.listen(3000)

