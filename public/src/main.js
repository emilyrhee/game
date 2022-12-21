const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
class MapRegion {
  constructor (src) {
    this.img = new Image();
    this.img.src = "images/" + src + ".png";
    this.w = this.img.width;
    this.h = this.img.height;
  }
  
  draw () {
    ctx.drawImage(this.img, 0, 0);
  }
}

const map = new MapRegion("grass");
map.w = 1600;
map.h = 800;

const inventory = {
  holdLimit: 1,
  items: []
}
class Sprite {
  constructor(src, x, y, w, h) {
    this.dx = x;
    this.dy = y;
    this.dw = w || 80;
    this.dh = h || 80;
    this.img = new Image();
    this.img.src = "images/" + src + ".png";
    this.speed = 3;
  }

  setSource(sx, sy, sw, sh) {
    this.sx = sx;
    this.sy = sy;
    this.sw = sw;
    this.sh = sh;
  }

  setFrame(frame, frameCycle) {
    this.frame = frame;
    this.frameCycle = frameCycle;
  }

  draw() {
    if (this.sx == null)
      ctx.drawImage(this.img, this.dx, this.dy, this.dw, this.dh);
    else {
      ctx.drawImage(this.img, 
                    this.frame * this.dw * 2, 0, this.sw, this.sh, 
                    this.dx, this.dy, this.dw, this.dh);
     }
  }

  enclose(map) {
    if (this.dx < 0) {
      this.dx = 0
    } else if (this.dx > 1600 - this.dw) {
      this.dx = 1600 - this.dw
    }
  
    if (this.dy < 0) {
      this.dy = 0
    } else if (this.dy > 800 - this.dh) {
      this.dy = 800 - this.dh
    }
  }
  
  update (map) {
    this.enclose(map);
  }
}

const player = new Sprite("player_front", 30, 40);
player.setSource(0, 0, 160, 160);
player.setFrame(0, [0, 1, 0, 2]);
const potionBlue = new Sprite("potion_blue", 200, 200);
const potionBlue2 = new Sprite("potion_blue", 300, 200);

const items = [potionBlue, potionBlue2];

function animateSprite(s) {
  s.frame++;
  if (s.frame >= s.frameCycle.length) 
    s.frame = 0;
};

function collision(thing) {
  let halfWidth = thing.dw / 2;
  let halfHeight = thing.dh / 2;
  if (player.dx + player.dw < thing.dx + halfWidth ||    // left
      player.dx > thing.dx + thing.dw - halfWidth ||     // right
      player.dy + player.dh < thing.dy + halfHeight ||   // top
      player.dy > thing.dy + thing.dh - halfHeight) {    // bottom
  return;
  }
  if (inventory.holdLimit > inventory.items.length) {
    thing.dx = -80;
    thing.dy = -80;
  }
  inventory.items.push(thing);
}

const menu = {
  isShown: false,
  x: -400,
  y: -400,
  w: 150,
  h: 100,
  draw: function() {
    ctx.beginPath();
    ctx.rect(menu.x, menu.y, menu.w, menu.h);
    ctx.stroke();
  },
  toggle: function() {
    if (menu.isShown) {
      this.isShown = false;
      this.x = -400;
      this.y = -400;
    } else {
      this.isShown = true;
      this.x = 200;
      this.y = 200;
    }
  } 
}

var pressKeyMap = {};
var holdDownKeyMap = {};

document.addEventListener("keydown", (event) => {
  pressKeyMap[event.key] = event.type == "keydown"; // true
  holdDownKeyMap[event.key] = event.type == "keydown"; // true
});

document.addEventListener("keyup", (event) => {
  if (pressKeyMap[event.key]) {
    if (pressKeyMap["e"]) menu.toggle();

    pressKeyMap[event.key] = event.type == "keydown"; // false
  }
  
  holdDownKeyMap[event.key] = event.type == "keydown"; // false
});

function holdDownKeys() {
  if (holdDownKeyMap["w"]) player.dy -= player.speed;
  if (holdDownKeyMap["a"]) player.dx -= player.speed;
  if (holdDownKeyMap["s"]) player.dy += player.speed;
  if (holdDownKeyMap["d"]) player.dx += player.speed;
} 

const camera = {
  x: 0,
  y: 0,
  clamp: function(coord, min, max) {
    if (coord < min) {
      return min
    } else if (coord > max) {
      return max
    } else {
      return coord
    }
  },
  focus: function(canvas, map, player) {
    this.x = this.clamp(player.dx - canvas.width / 2 + player.dw / 2, 0, map.w - canvas.width);
    this.y = this.clamp(player.dy - canvas.height / 2 + player.dh / 2, 0, map.h - canvas.height);
  },
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', function() {
 resizeCanvas();
});

function animate() {
  requestAnimationFrame(animate);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.update(map);

  camera.focus(canvas, map, player);

  ctx.translate(-camera.x, -camera.y);

  holdDownKeys();

  for (let i = 0; i < items.length; i++) {
    collision(items[i]);
  }

  map.draw();
  for (let i = 0; i < items.length; i++) {
    items[i].draw();
  }
  player.draw();  
  menu.draw();

  animateSprite(player);
}

animate();