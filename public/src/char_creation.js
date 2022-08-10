const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

var playerSkin = new Image();
playerSkin.src = "images/player_skin.png";


const body = {
  width: playerSkin.width,
  height: playerSkin.height,
  
  draw: function() {
    c.drawImage(playerSkin, 0, 0,
      this.width, this.height);
  }
}

const skin1 = new Path2D();
skin1.color = '#d4b292';
skin1.x = 100;
skin1.y = 100;

const skin2 = new Path2D();
skin2.color = '#8a6344';
skin2.x = 130;
skin2.y = 100;

canvas.addEventListener('click', (event) => {
  if (c.isPointInPath(skin1, event.offsetX, event.offsetY))
    currentSkin = skin1.color;

  if (c.isPointInPath(skin2, event.offsetX, event.offsetY))
    currentSkin = skin2.color;
});

function changeSkin(s) {
  c.fillStyle = s;
  c.globalCompositeOperation = "overlay";
  c.fillRect(0, 0, playerSkin.width, playerSkin.height);
  
  c.globalCompositeOperation = 'destination-in';
  c.drawImage(playerSkin, 0, 0);
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

  c.drawImage(playerSkin, 0, 0, playerSkin.width, playerSkin.height);  

  changeSkin(currentSkin);

  skinButton(skin1);
  skinButton(skin2);
}
animate();