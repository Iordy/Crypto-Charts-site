
window.onload = () => {


    const form = document.getElementsByTagName('form')[0];

    const email = form.getElementsByTagName('input')[0];

    const user = JSON.parse(localStorage.getItem("user"));

    if(user){

        email.value = user['email'];

    }

    form.addEventListener("submit", e => {

        const data = new FormData(e.target);

        localStorage.setItem("user", JSON.stringify({
            email: data.get('email'),
            password: data.get('username')
        }));
    })




    const barScrollValue = document.getElementById('crypto-interest-value');

    const barScroll = document.getElementById('crypto-interest');

    barScroll.addEventListener('input', () => {

        barScrollValue.innerHTML = '' + barScroll.value + '%';

    }
    );

}
