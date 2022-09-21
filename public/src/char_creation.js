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

class Skin extends Path2D {
  constructor(x, y, color) {
    super(); 
    this.x = x;
    this.y = y;
    this.color = color;
  }
  draw() {
    super.rect(this.x, this.y, 20, 20);
    c2.fillStyle = this.color;
    c2.fill(this);
  }
}
Skin.prototype.colors = ['#d4b292','#a37e6d','#8a6344'];

var skins = [];

for(var i = 0; i < 3; i++) {
  skins.push(new Skin(200 + 40 * i, 200, Skin.prototype.colors[i]))
}

var currentSkin = Skin.prototype.colors[0];

canvas2.addEventListener('click', (e) => {
  for (var skin of skins) {
    if (c2.isPointInPath(skin, e.offsetX, e.offsetY))
      currentSkin = skin.color;
  }
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

  for (var skin of skins)
    skin.draw();

  // skin1.draw();
  // skin2.draw();
  // skin3.draw();
}
animate();