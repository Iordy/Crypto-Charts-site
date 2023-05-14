
window.onload = function() {


const container = document.querySelector('.container');

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#FF';
  for (let i = 0; i < 4; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function changeBackgroundColor() {
  const randomColor = getRandomColor();
  container.style.backgroundColor = randomColor;
}

setInterval(changeBackgroundColor, 1000);


}
    
