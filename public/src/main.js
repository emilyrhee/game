const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

class Sprite {
  constructor(x, y, src) {
    this.x = x;
    this.y = y;
    this.w = 80;
    this.h = 80;
    this.img = new Image();
    this.img.src = "images/" + src + ".png";
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }
  update (map) {
    keys();
    // Optional, so they don't walk out of map boundaries
    enclose(map);
  }
}

const player = new Sprite(30, 40, "player");
const potionBlue = new Sprite(200, 200, "potion_blue");

function enclose(map) {
  if (this.x < 0) {
    this.x = 0
  } else if (this.x > map.w - this.w) {
    this.x = map.w - this.w
  }

  if (this.y < 0) {
    this.y = 0
  } else if (this.y > map.h - this.h) {
    this.y = map.h - this.h
  }
}

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

var keyMap = {};

function keys(){
  if (keyMap["w"]) player.y--;
  if (keyMap["a"]) player.x--;
  if (keyMap["s"]) player.y++;
  if (keyMap["d"]) player.x++;
  
  if (keyMap["e"] && !menuShown) menuShown = true;
  if (keyMap["e"] && menuShown) menuShown = false;
}

document.addEventListener('keydown', (event) => {
  keyMap[event.key] = event.type == 'keydown'; // true
});

document.addEventListener('keyup', (event) => {
  keyMap[event.key] = event.type == 'keydown'; //false
});

const map = new MapRegion("grass");
// map.w = 1600;
// map.h = 800;

class Camera {
  constructor (x, y) {
    // x and y are top-left coordinates of the camera rectangle relative to the map.
    // This rectangle is exctaly canvas.width px wide and canvas.height px tall.
    this.x = x || 0;
    this.y = y || 0;
  }
  
  focus (canvas, map, player) {
    // Account for half of player w/h to make their rectangle centered
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
  // Flip the sign b/c positive shifts the canvas to the right, negative - to the left
  ctx.translate(-camera.x, -camera.y);

  // Draw
  keys();

  map.draw(ctx);
  player.draw();    
  potionBlue.draw();

  console.table(camera.x, camera.y, map.w, map.h)

}
animate();