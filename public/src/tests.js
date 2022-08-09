const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

//const bangs = document.getElementById("bangs");

var bangs = new Image(); 

bangs.render = function() {
    c.drawImage(bangs, 0, 0, bangs.width, bangs.height);
};

bangs.onload = () => {
    bangs.render();
}; 
bangs.src = "images/bangs.png";


// ctx.globalCompositeOperation = "source-over";
// ctx.drawImage(bangs, 0, 0);

// ctx.globalCompositeOperation = "saturation";
// ctx.fillStyle = 10;  // hue doesn't matter here
// ctx.fillRect(0, 0, c.width, c.height);

// ctx.globalCompositeOperation = "hue";
// ctx.fillStyle = 'blue';  // sat must be > 0, otherwise won't matter
// ctx.fillRect(0, 0, c.width, c.height);

// ctx.globalCompositeOperation = "destination-in";
// ctx.drawImage(bangs, 0, 0);

// ctx.globalCompositeOperation = "source-over";

//c.globalCompositeOperation = 'source-over';

console.log(bangs.width + ' ' + bangs.height);
console.log(bangs);

// c.fillStyle = '#d4b292';
// c.globalCompositeOperation = "overlay";
// c.fillRect(0, 0, bangs.width, bangs.height);

// c.globalCompositeOperation = 'destination-in';
// c.drawImage(bangs, 0, 0);
