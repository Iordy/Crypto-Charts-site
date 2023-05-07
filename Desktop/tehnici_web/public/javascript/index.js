
window.onload = () => {

    const apikey = "202c235092420b385241d78206de7eda79723d69c07d663e60ed4fac6febc02c";
    const url = 'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD';



    async function getBitcoinPrice() {
        const response = await fetch(url);
        const data = await response.json();
        const price = data.USD;
        return price;
      }


    async function displayBitcoinPrice() {
        const price = await getBitcoinPrice();
        const priceElement = document.getElementById('bitcoin-price');
        priceElement.innerHTML = `Bitcoin Price Today: ${price}`;
    }


    const handleResize = () => {

        

        if (window.innerWidth < 400) {

            const sectionClass = document.getElementById('section-container');
            sectionClass.classList.remove('section-container');
            sectionClass.classList.add('section-container-mobile');

        } 

    }


    displayBitcoinPrice();
    handleResize();

}


const button = document.getElementById('register');

button.onclick = () => {



    
}


