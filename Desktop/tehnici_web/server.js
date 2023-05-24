
const express = require('express');

const {cwd} = require('process');

const path = require('path');

const fs = require('fs');

const app = express();

app.use(express.json());

const cookieParser = require('cookie-parser');

const render = require('ejs');

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.set('view engine', 'ejs');

app.use(express.static('public'));

let users = [];


app.get('/', async (req, res) => {

res.render('index');

});

app.get('/help', (req, res) => {


  res.render('help');


});


app.post('/login', async (req, res) => {

    const users = await getUsers();

    let message = '';

    const user = users.find(user => user.email === req.body.email);

    if(user == null){
        return res.status(400).send('Cannot find user');
    }

    try{
        if(user.username == req.body.username){
            res.cookie('id', user['id']);
            res.redirect('/watchlist');
        } else {
          return res.status(400).render('login', {message: 'Invalid user or pass'});
          
        }
    } catch {
        res.status(500).send();
    }


});

app.get('/login', async (req, res) => {

    res.render('login');

});


app.post('/register', async (req, res) => {


  const user = {
        id: Date.now().toString(),
        username: req.body.username,
        email: req.body.email
    }


  const temp = addUser(user);

    res.redirect('login');

  

  });


  app.get('/register', async (req, res) => {

    res.render('register');

  });



app.use((req, res, next) => {
    const { cookies } = req;
    if (cookies['id']) {
      next();
    } else {
      if (req.path === '/') {
        return res.redirect('/login');
      }
      res.redirect('/login');
    }
  });



  app.get('/watchlist', async (req, res) => {

    const users = await getUsers();
    const { cookies } = req;
    const userId = cookies['id'];
    const user = users.find((user) => user.id === userId);

    const watchlist = await getWatchlists();
    const userWatchlist = watchlist.filter((watchlist) => watchlist.id === userId);

    let prices = [];

    for(let i = 0 ; i < userWatchlist.length; i++) {
      let price = await getCryptoPrice(userWatchlist[i]['token']);
      prices.push(price);
  }
  


  sleep(2000);
  res.render('watchlist', { user: user, watchlist: userWatchlist, tokenPrices: prices});

  



  });

  


  
  app.get('/profile', async (req, res) => {


    const users = await getUsers();
    const { cookies } = req;
    const userId = cookies['id'];
    const user = users.find((user) => user.id === userId);
  
    if (!user) {
      return res.redirect('/page-not-found', { message: 'User not found' });
    }

    
  
    res.render('profile', { userEmail: user.email, userPass: user.username });
    


  });

 
  
app.get('/temp', (req, res)=>

{
  res.redirect('/watchlist');
}

);


  app.post('/watchlist', async (req, res) => {

    const cryptoName = req.body.cryptocurrency;

    let watchlist = await getWatchlists();
  
    await addWatchlist(req.cookies['id'], cryptoName);
  
   
    res.redirect('/watchlist');

  });

  app.get('/logout', async (req, res) => {

    res.clearCookie('id');
    res.redirect('/login');


  });




app.use((req, res) => {

    res.status(404).render('page-not-found');

});



function getUsers(){

    return new Promise((resolve, reject) =>
    {
        
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



function containsObject(obj, list) {

    for (let i = 0; i < list.length; i++) {

        if (list[i]['email'] == obj['email']) {
            return true;
        }

    }

    return false;
}



async function addUser(user){

    const users = await getUsers();

    if(containsObject(user, users) == false){
        users.push(user);
        fs.writeFile('users.json', JSON.stringify(users), (after) => {});
        return true;
    }

    return false;

}


function getWatchlists() {

    return new Promise((resolve, reject) => {
      const filePath = path.join(cwd(), 'watchlist.json');
      fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
        if (err) {
          resolve([]);
        } else {
          try {
            resolve(JSON.parse(data));
          } catch (err) {
            resolve([]);
          }
        }
      })
    })
  }


  
  async function addWatchlist(userId, ticker) {

    const watchlists = await getWatchlists();

    const user  = userId;

    const symbol = ticker;

    watchlists.push({token: symbol ,id:user});
  
    fs.writeFile('watchlist.json', JSON.stringify(watchlists), (after) => {});

  }
  


  const getCryptoPrice = async (cryptoName) => {  

    const response = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${cryptoName}&tsyms=USD`);

    const data = await response.json();

    return data.USD;

  };
  

  function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }



  


app.listen(3000)

