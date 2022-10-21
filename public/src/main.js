
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

class MapRegion {
  constructor (src) {
    this.img = new Image();
    this.img.src = "images/" + src + ".png";
    this.w = this.img.width;
    this.h = this.img.height;
  }
  
  draw (ctx) {
    ctx.drawImage(this.img, 0, 0)
  }
}

const map = new MapRegion("grass");
map.w = 1600;
map.h = 800;

class Inventory {
  constructor() {

  }

}
class Sprite {
  constructor(x, y, src) {
    this.x = x;
    this.y = y;
    this.w = 80;
    this.h = 80;
    this.img = new Image();
    this.img.src = "images/" + src + ".png";
    this.speed = 3;
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    this.path.rect(this.x, this.y, this.w, this.h);
    ctx.stroke(this.path)
  }

  enclose(map) {
    if (this.x < 0) {
      this.x = 0
    } else if (this.x > 1600 - this.w) {
      this.x = 1600 - this.w
    }
  
    if (this.y < 0) {
      this.y = 0
    } else if (this.y > 800 - this.h) {
      this.y = 800 - this.h
    }
  }
  
  update (map) {
    this.enclose(map);
  }

}

const player = new Sprite(30, 40, "player");
const potionBlue = new Sprite(200, 200, "potion_blue");

function collision() {
  if (
    player.x + player.w < potionBlue.x ||
    player.x > potionBlue.x + potionBlue.w ||
    player.y + player.h < potionBlue.y ||
    player.y > potionBlue.y + potionBlue.h
  ) {
    return;
  }
  console.log(true);
}

var keyMap = {};
var menuShown = false;

function keys(){
  if (keyMap["w"]) player.y -= player.speed;
  if (keyMap["a"]) player.x -= player.speed;
  if (keyMap["s"]) player.y += player.speed;
  if (keyMap["d"]) player.x += player.speed;

  if (keyMap["e"] && !menuShown) menuShown = true;
  if (keyMap["e"] && menuShown) menuShown = false;
}

document.addEventListener('keydown', (event) => {
  keyMap[event.key] = event.type == 'keydown'; // true
});

document.addEventListener('keyup', (event) => {
  keyMap[event.key] = event.type == 'keydown'; //false
});

class Camera {
  constructor (x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }
  
  focus (canvas, map, player) {
    this.x = this.clamp(player.x - canvas.width / 2 + player.w / 2, 0, map.w - canvas.width);
    this.y = this.clamp(player.y - canvas.height / 2 + player.h / 2, 0, map.h - canvas.height);
  }
  
  clamp (coord, min, max) {
    if (coord < min) {
      return min
    } else if (coord > max) {
      return max
    } else {
      return coord
    }
  }
}

const camera = new Camera()

function animate() {
  requestAnimationFrame(animate);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.update(map);

  camera.focus(canvas, map, player);
  ctx.translate(-camera.x, -camera.y);

  keys();

  map.draw(ctx);  
  potionBlue.draw();
  player.draw();  

  collision();

  console.table(player.path)

}
animate();
