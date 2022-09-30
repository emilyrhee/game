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

player = new Sprite(300, 300, "player");

function animate() {
  requestAnimationFrame(animate);

  player.draw();
}
animate();