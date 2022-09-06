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

var skin = new Path2D();
skin.x = 200;
skin.y = 200;
skin.draw = function() {
  skin.rect(this.x, this.y, 20, 20);
  c2.fillStyle = this.color;
  c2.fill(skin);
};

var skin1 = Object.create(skin);
skin1.color = '#d4b292';

var skin2 = Object.create(skin);
skin2.color = '#a37e6d';
skin2.x = skin.x + 40;

var skin3 = Object.create(skin);
skin3.color = '#8a6344';
skin3.x = skin.x + 80;

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

function animate() {
  requestAnimationFrame(animate);
  c1.clearRect(0, 0, canvas1.width, canvas1.height);
  c2.clearRect(0, 0, canvas2.width, canvas2.height);

  c1.drawImage(playerSkin, body.x, body.y, playerSkin.width, playerSkin.height);
  changeSkin(currentSkin);

  c2.drawImage(bangs, body.x, body.y, playerSkin.width, playerSkin.height); 

  skin1.draw();
  skin2.draw();
  skin3.draw();
}
animate();