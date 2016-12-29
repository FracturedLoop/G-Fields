var Laser = function (img, posX, posY, rot, vel, owner) {

    var image = new Image();
    image.src = 'assets/' + img;
    this.sprite = image;

    this.width = image.width;
    this.height = image.height;
    this.shootSFX = 0;
    this.velX = 0;
    this.velY = 0;
    this.rot = rot;
    this.posX = posX;
    this.posY = posY;
    this.spriteFrame = 0;
    this.createDate = 0;
    this.owner = owner;
    owner.bullets.push(this);
    projectiles.push(this);
    this.setVel(vel);
    this.setDate();
};

Laser.prototype.setVel = function (vel) {
    this.velX += this.rotToX() * vel;
    this.velY += this.rotToY() * vel;
};

Laser.prototype.rotToX = function () {
    return Math.cos(this.rot);
};

Laser.prototype.rotToY = function () {
    return Math.sin(this.rot);
};

Laser.prototype.setSprite = function (src) {
    var image = new Image();
    image.src = src;
    this.sprite = image;
    this.width = image.width;
    this.height = image.height;
};

Laser.prototype.setDate = function () {
    this.createDate = new Date();
};

Laser.prototype.age = function () {
    return new Date() - this.createDate;
};

Laser.prototype.update = function () {
    if (this.age() > 2000) {
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
};

Laser.prototype.destroy = function () {
    this.owner.bullets.splice(this.owner.bullets.indexOf(this), 1);
    projectiles.splice(projectiles.indexOf(this), 1);
    delete(this);
};

Laser.prototype.render = function () {
    ctx.save();
    ctx.translate(this.posX, this.posY);
    ctx.rotate(this.rot + degreesToRads(90));
    ctx.translate(-this.width / 2, -this.height / 2);
    ctx.drawImage(this.sprite, 0, 0, this.width, this.height);

    ctx.restore();
};