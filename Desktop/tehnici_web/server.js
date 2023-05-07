
const express = require('express');

const app = express();


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




const SignIn = require('./signIn');
const SignUp = require('./register');

app.use('/SignIn', SignIn);
app.use('/register', SignUp)




app.listen(3000)

