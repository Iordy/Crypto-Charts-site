
window.onload = () =>  {

const linksSection = document.getElementById('links-section');
const addMoreLinksButton = document.getElementById('add-more-links');

const linksArray = [
    'https://coinmarketcap.com/',
    'https://www.coingecko.com/',
    'https://www.coindesk.com/',
    'https://www.binance.com/en',
    'https://twitter.com',
    'https://ethereum.org/en/',
    'https://www.bitcoin.com/',
    'https://global.bittrex.com/account/login'
];


let currentLinks = linksArray.slice(0, 3);
displayLinks(currentLinks);

addMoreLinksButton.addEventListener('click', () => {
  
    let newLinks = [];
    for(let i = 0; i < 1; i++){
        let randomIndex = Math.floor(Math.random() * linksArray.length);
        newLinks.push(linksArray[randomIndex]);
    }


    currentLinks = currentLinks.concat(newLinks);

 
    displayLinks(currentLinks);
});

function displayLinks(links) {

    linksSection.innerHTML = '';

  
    for (const link of links) {
        let a = document.createElement('a');
        a.href = link;
        a.textContent = link.substring(8);
        linksSection.appendChild(a);
    }
}


document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        moveLinks();
    }
});

function moveLinks() {
    let links = document.querySelectorAll('#links-section a');

    links.forEach((link) => {
        let randomX = Math.floor(Math.random() * window.innerWidth);
        let randomY = Math.floor(Math.random() * window.innerHeight);
        
        link.style.position = 'fixed';
        link.style.left = `${randomX}px`;
        link.style.top = `${randomY}px`;
    });
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        resetLinks();
    }
});

function resetLinks() {
    let links = document.querySelectorAll('#links-section a');

    links.forEach((link) => {
        link.style.position = '';
        link.style.left = '';
        link.style.top = '';
    });
}

const removeLinksButton = document.getElementById('remove-links');

removeLinksButton.addEventListener('click', () => {
    currentLinks = [];
    displayLinks(currentLinks);
});



}
