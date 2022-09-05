const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const canvas2 = document.querySelector('canvas');
const c2 = canvas2.getContext('2d');

var nameInput = document.getElementById("name");
var playerSkin = new Image();
playerSkin.src = "images/player_skin.png";

//var bangs = new Image();
//bangs.src = "images/bangs.png"

const body = {
  width: playerSkin.width,
  height: playerSkin.height,
  x: canvas.width / 12,
  y: canvas.height / 7
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

canvas.addEventListener('click', (event) => {
  if (c.isPointInPath(skin1, event.offsetX, event.offsetY))
    currentSkin = skin1.color;

  if (c.isPointInPath(skin2, event.offsetX, event.offsetY))
    currentSkin = skin2.color;

  if (c.isPointInPath(skin3, event.offsetX, event.offsetY))
    currentSkin = skin3.color;
});

function changeSkin(s) {
  c.fillStyle = s;
  c.globalCompositeOperation = "overlay";
  c.fillRect(body.x, body.y, playerSkin.width, playerSkin.height);
  
  c.globalCompositeOperation = 'destination-in';
  c.drawImage(playerSkin, body.x, body.y);
  c.globalCompositeOperation = "source-over";
}

function skinButton(obj) {
  obj.rect(obj.x, obj.y, 20, 20);
  c.fillStyle = obj.color;
  c.fill(obj);
}

currentSkin = skin1.color;

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  c.drawImage(playerSkin, body.x, body.y, playerSkin.width, playerSkin.height);  
  //c.drawImage(bangs, body.x, body.y, playerSkin.width, playerSkin.height); 

  changeSkin(currentSkin);

  skinButton(skin1);  // fix flickering
  skinButton(skin2);
  skinButton(skin3);
}
animate();