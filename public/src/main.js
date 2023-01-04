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
player.setFrame(0, [0, 1, 2, 1]);
const potionBlue = new Sprite("potion_blue", 200, 200);
const potionBlue2 = new Sprite("potion_blue", 300, 200);

const items = [potionBlue, potionBlue2];

function animateSprite(s, t) {
  for (const frame of player.frameCycle) {
    
  }

  if (t >= 1) 
    s.frame = 0;
  else if (t >= 0.75)
    s.frame = 1;
  else if (t >= 0.5)
    s.frame = 2;
  else if (t >= 0.25)
    s.frame = 1;
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
  let speed = 3;
  if (holdDownKeyMap["w"]) player.dy -= speed;
  if (holdDownKeyMap["a"]) player.dx -= speed;
  if (holdDownKeyMap["s"]) player.dy += speed;
  if (holdDownKeyMap["d"]) player.dx += speed;
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

const duration = 1000;
let starttime = null;

function animate(timestamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!starttime)
    starttime = timestamp;

  const runtime = timestamp - starttime;
  const relativeProgress = runtime / duration;

  if (runtime < duration)
    requestAnimationFrame(animate);

  console.log(relativeProgress);
  
  animateSprite(player, relativeProgress);

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

requestAnimationFrame(animate);

animate();