var Ship = function (img, width, height, posX, posY) {

    var image = new Image();
    image.src = 'assets/' + img;
    this.sprite = image;
    this.velY = 0;
    this.velX = 0;
    this.rot = 0;
    this.health = 3;
    this.maxHealth = 3;
    this.width = width;
    this.height = height;
    this.isThrusting = false;
    this.posX = posX;
    this.posY = posY;
    this.thrustSprites = [1, 2, 3];
    this.breakSprites = [4, 5, 6, 7, 8];
    this.breakFrame = 0;
    this.thrustFrame = 0;
    this.spriteFrame = 0;
    this.bullets = [];
    this.isBroken = false;
    this.lastFired = new Date();

    ships.push(this);
};

Ship.prototype.accel = function (vel) {
    this.velX += this.rotToX() * vel;
    this.velY += this.rotToY() * vel;

};

Ship.prototype.rotToX = function () {
    return Math.cos(this.rot);
};

Ship.prototype.rotToY = function () {
    return Math.sin(this.rot);
};

Ship.prototype.fire = function () {
    this.lastFired = new Date();
    new Laser('laser-red.png', this.posX, this.posY, this.rot, 10, this);
};

Ship.prototype.readControls = function () {

};

Ship.prototype.update = function () {
    this.readControls();

    for (var bul in projectiles) {
        if (Math.sqrt(Math.abs(Math.pow(this.posX + this.width / 2 - projectiles[bul].posX + projectiles[bul].width / 2, 2) + Math.pow(this.posY + this.height / 2 - projectiles[bul].posY + projectiles[bul].height / 2, 2))) < this.width && this != projectiles[bul].owner) {
            projectiles[bul].destroy();
            this.health -= 1;
        }
        if (this.health == 0) {
            this.isBroken = true;
        }
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

    if (this.posX < 0) {
        this.posX = 0;
    }
    else if (this.posX > env.width) {
        this.posX = env.width;
    }
    if (this.posY < 0) {
        this.posY = 0;
    }
    else if (this.posY > env.height) {
        this.posY = env.height;
    }
};

Ship.prototype.render = function () {
    ctx.save();
    var tx;
    var ty = camera.width / 2;
    if (this === player) {
        if (this.posX >= camera.width / 2 && this.posX <= camera.maxX + camera.width / 2) {
            tx = camera.width / 2;
        }
        else if (this.posX < camera.width) {
            tx = this.posX;
        }
        else {
            tx = this.posX - camera.posX;
        }

        if (this.posY >= camera.height / 2 && this.posY <= camera.maxY + camera.height / 2) {
            ty = camera.height / 2;
        }
        else if (this.posY < camera.height) {
            ty = this.posY;
        }
        else {
            ty = this.posY - camera.posY;
        }



        ctx.translate(tx, ty);
    }
    else {
        tx = this.posX + this.width / 2 - camera.posX;
        ty = this.posY + this.height / 2 - camera.posY;
        ctx.translate(tx, ty);
    }
    ctx.rotate(this.rot + degreesToRads(90));
    ctx.translate(-this.width / 2, -this.height / 2);
    if (this.isBroken) {
        if (this.breakFrame < this.breakSprites.length) {
            ctx.drawImage(this.sprite, this.width * this.breakSprites[this.breakFrame], 0, 32, 32, 0, 0, 32, 32);
        }
        else {
            ships.splice(ships.indexOf(this), 1);
            delete(this);
        }
        if (animationFrame % 6 == 0) {
            this.breakFrame += 1;
        }
    }
    else if (this.isThrusting) {
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

    // draw the health bar
    ctx.save();
    ctx.translate(tx - this.width / 2, ty - this.height);
    ctx.fillStyle = '#d50000';
    ctx.strokeStyle = '#d50000';
    ctx.fillRect(0, 0, 32 * this.health / this.maxHealth, 4);
    ctx.strokeRect(0, 0, 32, 4);
    ctx.restore();
};