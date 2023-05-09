
const express = require('express');

const {cwd} = require('process');

const path = require('path');

const fs = require('fs');

const app = express();

app.use(express.json());

const bcrypt = require('bcrypt');


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

let users = [];

app.post('/register', async (req, res, next) => {


    const user = {
        id: Date.now().toString(),
        username: req.body.username,
        email: req.body.email
    }

   const temp = addUser(user);

  if(temp)
    res.redirect('/login');
    else res.redirect('/register', {message: 'User already exists'})

  });


app.get('/login', async (req, res) => {

    res.render('login');

    const user = users.find(user => user.username === req.body.username);
    


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




function getUsers(){
    return new Promise((resolve, reject) =>{
        
        const filePath = path.join(cwd(), 'users.json');

        fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
            if(err) {
                resolve([]);
            }
            try {
                resolve(JSON.parse(data));
            } 
            catch(err) {
                resolve([]);
            }
        })

    })
}


async function addUser(user){

    const users = await getUsers();

    // if the user is not in the array we add it
    if(containsObject(user, users) == false){
        users.push(user);
        fs.writeFile('users.json', JSON.stringify(users), (after) => {});
        return true;
    }

    return false;

}


function containsObject(obj, list) {
    for (let i = 0; i < list.length; i++) {
        if (list[i]['email'] == obj['email']) {
            return true;
        }
    }

    return false;
}



app.listen(3000)

