var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var keys = [];

var ship = {
    img: 'assets/ship.png',
    fireEl: document.getElementById('ship-thrust'),
    velX: 0,
    velY: 0,
    rot: 0,
    width: 0,
    height: 0,
    isThrusting: false,
    posX: canvas.width / 2,
    posY: canvas.height / 2,
    sprite: "",
    accel: function(vel) {
        this.velX += this.rotToX() * vel;
        this.velY += this.rotToY() * vel;

    },
    rotToX: function() {
        return Math.cos(this.rot);
    },
    rotToY: function() {
        return Math.sin(this.rot);
    },
    drawFire: function() {

    },
    killFire: function() {

    },
    setSprite: function() {
        var image = new Image();
        image.src = this.img;
        this.sprite = image;
    },
    update: function() {
        this.posX += this.velX;
        this.posY += this.velY;

        // friction
        if (player.velX > 0) {
            player.velX -= player.velX * 0.01;
        }
        else if (player.velX < 0) {
            player.velX -= player.velX * 0.01;
        }
        if (player.velY > 0) {
            player.velY -= player.velY * 0.01;
        }
        else if (player.velY < 0) {
            player.velY -= player.velY * 0.01;
        }

        this.draw();
    },
    draw: function() {
        ctx.save();
        ctx.translate(this.posX + this.width / 2, this.posY + this.height / 2);
        ctx.rotate(this.rot + degreesToRads(90));
        ctx.translate(-this.width / 2, -this.height / 2);
        ctx.drawImage(this.sprite, 0, 0, 32, 32);
        ctx.restore();
    },
    create: function(img, width, height, posX, posY) {
        var newShip = Object.create(this);
        newShip.img = 'assets/' + img;
        newShip.width = width;
        newShip.height = height;
        newShip.posX = posX;
        newShip.posY = posY;
        newShip.setSprite();
        return newShip;
    }


}

var player = ship.create('ship.png', 32, 32, canvas.width / 2, canvas.height / 2);





update();

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (keys[37]) {
        player.rot -= 0.05;
    }
    else if (keys[39]) {
        player.rot += 0.05;
    }
    if (keys[38]) {
        player.accel(0.1);
        player.isThrusting = true;
    }
    else {
        player.isThrusting = false;
    }

    player.update();

    window.requestAnimationFrame(update);
}

window.addEventListener("keydown", function (event) {
    keys[event.keyCode] = true;
    if (event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40) {
        event.preventDefault();
    }
}, true);

window.addEventListener("keyup", function (event) {
    delete keys[event.keyCode];
}, true);