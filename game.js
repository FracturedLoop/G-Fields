var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var keys = [];
var animationFrame = 0;

var ship = {
    img: 'ship',
    velX: 0,
    velY: 0,
    rot: 0,
    width: 0,
    height: 0,
    isThrusting: false,
    posX: canvas.width / 2,
    posY: canvas.height / 2,
    sprite: "",
    thrustSprites: [1, 2, 3],
    thrustFrame: 0,
    spriteFrame: 0,
    bullets: [],
    lastFired: new Date(),
    accel: function (vel) {
        this.velX += this.rotToX() * vel;
        this.velY += this.rotToY() * vel;

    },
    rotToX: function () {
        return Math.cos(this.rot);
    },
    rotToY: function () {
        return Math.sin(this.rot);
    },
    drawFire: function () {

    },
    killFire: function () {

    },
    setSprite: function () {
        var image = new Image();
        image.src = this.img;
        this.sprite = image;
    },
    update: function () {
        if (keys[37] || keys[65]) {
            this.rot -= 0.05;
        }
        else if (keys[39] || keys[68]) {
            this.rot += 0.05;
        }
        if (keys[38] || keys[87]) {
            this.accel(0.1);
            this.isThrusting = true;
        }
        else {
            this.isThrusting = false;
        }
        if (keys[32] && new Date() - this.lastFired > 1000) {
            this.lastFired = new Date();
            laser.create('laser-red.png', 4, 16, this.posX + this.width / 2, this.posY + this.height / 2, this.rot, 15, this);
        }

        for (bul of this.bullets) {
            bul.update();
        }

        // debugging stop with k
        if (keys[75]) {
            this.velX = 0;
            this.velY = 0;
        }

        this.posX += this.velX;
        this.posY += this.velY;

        // friction
        if (this.velX > 0) {
            this.velX -= this.velX * 0.01;
        }
        else if (this.velX < 0) {
            this.velX -= this.velX * 0.01;
        }
        if (this.velY > 0) {
            this.velY -= this.velY * 0.01;
        }
        else if (this.velY < 0) {
            this.velY -= this.velY * 0.01;
        }

        if (this.posX < 0 - this.width) {
            this.posX = canvas.width;
        }
        else if (this.posX > canvas.width) {
            this.posX = 0 - this.width;
        }
        if (this.posY < 0 - this.height) {
            this.posY = canvas.height;
        }
        else if (this.posY > canvas.height) {
            this.posY = 0 - this.height;
        }

        this.draw();
    },
    draw: function () {
        ctx.save();
        ctx.translate(this.posX + this.width / 2, this.posY + this.height / 2);
        ctx.rotate(this.rot + degreesToRads(90));
        ctx.translate(-this.width / 2, -this.height / 2);
        if (this.isThrusting) {
            ctx.drawImage(this.sprite, this.width * this.thrustSprites[this.spriteFrame], 0, 32, 32, 0, 0, 32, 32);
            if (animationFrame % 6 == 0) {
                this.spriteFrame += 1;
            }
            if (this.spriteFrame >= this.thrustSprites.length) {
                this.spriteFrame = 0;
            }
        }
        else {
            ctx.drawImage(this.sprite, 0, 0, 32, 32, 0, 0, 32, 32);
        }
        ctx.restore();
    },
    create: function (img, width, height, posX, posY) {
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

var laser = {
    img: 'laser-red.png',
    velX: 0,
    velY: 0,
    rot: 0,
    width: 0,
    height: 0,
    posX: canvas.width / 2,
    posY: canvas.height / 2,
    sprite: "",
    spriteFrame: 0,
    createDate: 0,
    owner: {},
    setVel: function (vel) {
        this.velX += this.rotToX() * vel;
        this.velY += this.rotToY() * vel;

    },
    rotToX: function () {
        return Math.cos(this.rot);
    },
    rotToY: function () {
        return Math.sin(this.rot);
    },
    setSprite: function () {
        var image = new Image();
        image.src = this.img;
        this.sprite = image;
    },
    setDate: function() {
        this.createDate = new Date();
    },
    update: function () {
        if (new Date() - this.createDate > 1000) {
            this.destroy();
        }
        this.posX += this.velX;
        this.posY += this.velY;

        if (this.posX < 0 - this.width) {
            this.posX = canvas.width;
        }
        else if (this.posX > canvas.width) {
            this.posX = 0 - this.width;
        }
        if (this.posY < 0 - this.height) {
            this.posY = canvas.height;
        }
        else if (this.posY > canvas.height) {
            this.posY = 0 - this.height;
        }

        this.draw();
    },
    destroy: function() {
        this.owner.bullets.splice(this.owner.bullets.indexOf(this), 1);
        delete(this);
    },
    draw: function() {
        ctx.save();
        ctx.translate(this.posX + this.width / 2, this.posY + this.height / 2);
        ctx.rotate(this.rot + degreesToRads(90));
        ctx.translate(-this.width / 2, -this.height / 2);
        ctx.drawImage(this.sprite, 0, 0, this.width, this.height);

        ctx.restore();
    },
    create: function (img, width, height, posX, posY, rot, vel, owner) {
        var newBullet = Object.create(this);
        newBullet.img = 'assets/' + img;
        newBullet.width = width;
        newBullet.height = height;
        newBullet.posX = posX - newBullet.width / 2;
        newBullet.posY = posY - newBullet.height / 2;
        newBullet.rot = rot;
        newBullet.setVel(vel);
        newBullet.setSprite();
        newBullet.setDate();
        newBullet.owner = owner;
        owner.bullets.push(newBullet);
        return newBullet;
    }
}

var player = ship.create('ship-sprites.png', 32, 32, canvas.width / 2, canvas.height / 2);


var bg = new Image();
bg.src = 'assets/bg.png';
bg.onload = function () {
    bg = ctx.createPattern(bg, 'repeat');
    ctx.fillStyle = bg;
}


update();

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    player.update();

    if (animationFrame >= 60) {
        animationFrame = 0;
    }
    else {
        animationFrame++;
    }

    window.requestAnimationFrame(update);
}

window.addEventListener("keydown", function (event) {
    keys[event.keyCode] = true;
    if (event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40 || event.keyCode == 65 || event.keyCode == 68 || event.keyCode == 87 || event.keyCode == 32 || event.keyCode == 75) {
        event.preventDefault();
    }
}, true);

window.addEventListener("keyup", function (event) {
    delete keys[event.keyCode];
}, true);