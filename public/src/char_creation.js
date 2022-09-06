const canvas1 = document.getElementById('canvas1');
const c1 = canvas1.getContext('2d');
const canvas2 = document.getElementById('canvas2');
const c2 = canvas2.getContext('2d');

var nameInput = document.getElementById("name");
var playerSkin = new Image();
playerSkin.src = "images/player_skin.png";

var bangs = new Image();
bangs.src = "images/bangs.png"

const body = {
  width: playerSkin.width,
  height: playerSkin.height,
  x: canvas1.width / 12,
  y: canvas1.height / 7
}

const skin1 = new Path2D();
skin1.color = '#d4b292';
skin1.x = 200;
skin1.y = 200;

const skin2 = new Path2D();
skin2.color = '#a37e6d';
skin2.x = skin1.x + 40;
skin2.y = skin1.y;

const skin3 = new Path2D();
skin3.color = '#8a6344';
skin3.x = skin1.x + 80;
skin3.y = 200;

var currentSkin = skin1.color;

canvas2.addEventListener('click', (event) => {
  if (c2.isPointInPath(skin1, event.offsetX, event.offsetY))
    currentSkin = skin1.color;

  if (c2.isPointInPath(skin2, event.offsetX, event.offsetY))
    currentSkin = skin2.color;

  if (c2.isPointInPath(skin3, event.offsetX, event.offsetY))
    currentSkin = skin3.color;
});

function changeSkin(s) {
  c1.fillStyle = s;
  c1.globalCompositeOperation = "overlay";
  c1.fillRect(body.x, body.y, playerSkin.width, playerSkin.height);
  
  c1.globalCompositeOperation = 'destination-in';
  c1.drawImage(playerSkin, body.x, body.y);
  c1.globalCompositeOperation = "source-over";
}

currentSkin = skin1.color;

function animate() {
  requestAnimationFrame(animate);
  c1.clearRect(0, 0, canvas1.width, canvas1.height);
  c2.clearRect(0, 0, canvas2.width, canvas2.height);

  c1.drawImage(playerSkin, body.x, body.y, playerSkin.width, playerSkin.height);
  changeSkin(currentSkin);

  c2.drawImage(bangs, body.x, body.y, playerSkin.width, playerSkin.height); 

}
animate();