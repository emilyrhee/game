const canvas1 = document.getElementById('canvas1');
const c1 = canvas1.getContext('2d');
const canvas2 = document.getElementById('canvas2');
const c2 = canvas2.getContext('2d');

var nameInput = document.getElementById("name");

var playerSkin = new Image();
playerSkin.src = "images/body.png";

var bangs = new Image();
bangs.src = "images/hair/bangs.png"

var buzz = new Image();
buzz.src = "images/hair/buzz.png"

const spriteX = canvas1.width / 12;
const spriteY = canvas1.height / 7;
const hairX = 400;
const hairY = 50;

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

class HairButton extends Path2D {
  constructor(x, y) {
    super(); 
    this.x = x;
    this.y = y;
  }
  draw() {
    super.rect(this.x, this.y, 80, 80);
  }
}

var currentHair = bangs;

bangsButton = new HairButton(400, 50);
buzzButton = new HairButton(bangsButton.x + 80, 50);

Skin.prototype.colors = ['#d4b292','#a37e6d','#8a6344'];

var skins = [];

for(var i = 0; i < 3; i++) {
  skins.push(new Skin(250 + 40 * i, 200, Skin.prototype.colors[i]))
}

canvas2.addEventListener('click', (e) => {
  for (var skin of skins) {
    if (c2.isPointInPath(skin, e.offsetX, e.offsetY))
      currentSkin = skin.color;
  }

  if (c2.isPointInPath(bangsButton, e.offsetX, e.offsetY))
    currentHair = bangs;

  if (c2.isPointInPath(buzzButton, e.offsetX, e.offsetY))
    currentHair = buzz;
});

var currentSkin = Skin.prototype.colors[0];

function changeSkin(s) {
  c1.fillStyle = s;
  c1.globalCompositeOperation = "overlay";
  c1.fillRect(spriteX, spriteY, playerSkin.width, playerSkin.height);
  
  c1.globalCompositeOperation = 'destination-in';
  c1.drawImage(playerSkin, spriteX, spriteY);
  c1.globalCompositeOperation = "source-over";
}

var currentHairColor = '#990000';

function changeHairColor(s) {
  c2.fillStyle = s;
  c2.globalCompositeOperation = "overlay";
  c2.fillRect(spriteX, spriteY, playerSkin.width, playerSkin.height);
  
  c2.globalCompositeOperation = 'destination-in';
  c2.drawImage(playerSkin, spriteX, spriteY);
  c2.globalCompositeOperation = "source-over";
}

function animate() {
  requestAnimationFrame(animate);
  c1.clearRect(0, 0, canvas1.width, canvas1.height);
  c2.clearRect(0, 0, canvas2.width, canvas2.height);

  c1.drawImage(playerSkin, spriteX, spriteY);
  changeSkin(currentSkin);

  c2.drawImage(currentHair, spriteX, spriteY); 
  changeHairColor(currentHairColor);

  // hair buttons
  c2.drawImage(bangs, hairX, hairY, 80, 80);
  c2.drawImage(buzz, hairX + 80, hairY, 80, 80)

  for (var skin of skins)
    skin.draw();

  bangsButton.draw();
  buzzButton.draw();
}

animate();