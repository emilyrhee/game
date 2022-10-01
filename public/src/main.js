const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

class Sprite {
  constructor(x, y, src) {
    this.x = x;
    this.y = y;
    this.img = new Image();
    this.img.src = "images/" + src + ".png";
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, 80, 80);
  }
}

var keyMap = {};

function keys(){
  if (keyMap["w"]) {
    player.y--;
  }
  if (keyMap["a"]) {
    player.x--;
  }
  if (keyMap["s"]) {
    player.y++;
  } 
  if (keyMap["d"]) {
    player.x++;
  }
}

document.addEventListener('keydown', (event) => {
  keyMap[event.key] = event.type == 'keydown'; // true
});

document.addEventListener('keyup', (event) => {
  keyMap[event.key] = event.type == 'keydown'; //false
});

player = new Sprite(300, 300, "player");

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.draw();
  keys();
}
animate();