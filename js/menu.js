var Menu = function(buttons, images, texts) {
    this.buttons = buttons;
    this.images = images;
    this.texts = texts;
};

Menu.prototype.addImage = function(image) {
    this.images.push(image);
};

Menu.prototype.addButton = function(btn) {
    this.buttons.push(btn);
};

Menu.prototype.render = function() {
    this.images.forEach(function(img) {
        img.render();
    });
    this.buttons.forEach(function(btn) {
        btn.render();
    });
    this.texts.forEach(function(txt) {
        txt.render();
    })
};

Menu.prototype.update = function() {
    this.images.forEach(function(img) {
        img.update();
    });
    this.buttons.forEach(function(btn) {
        btn.update();
    });
    this.texts.forEach(function(txt) {
        txt.update();
    })

};

var Button = function(posX, posY, width, height, text, action) {
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.text = text;
    this.action = action;
};

Button.prototype.update = function() {
    if (mouse.posX > this.posX && mouse.posX < this.posX + this.width && mouse.posY > this.posY && mouse.posY < this.posY + this.height && mouse.isDown) {
        this.action();
    }
};

Button.prototype.render = function() {
    ctx.fillStyle = "#212121";
    ctx.fillRect(this.posX, this.posY, this.width, this.height);
    ctx.fillStyle = "#ffffff";
    ctx.font = this.height / 2 + 'px sans-serif';
    ctx.fillText(this.text, this.posX + (this.width / 2) - (ctx.measureText(this.text).width / 2), this.posY + (this.height / 2) + (parseInt(ctx.font) / 4));
};


Button.prototype.onclick = function() {
    this.action();
};

var MenuImage = function(url, posX, posY, width, height) {
    var image = new Image();
    image.src = 'assets/' + url;
    this.img = image;

    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
};

MenuImage.prototype.render = function() {
    ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
};

MenuImage.prototype.update = function() {

};

var MenuText = function(posX, posY, text, size) {
    this.posX = posX;
    this.posY = posY;
    this.text = text;
    this.size = size;
};

MenuText.prototype.update = function() {

};

MenuText.prototype.render = function() {
    ctx.fillStyle = "#ffffff";
    ctx.font = this.size + 'px sans-serif';
    ctx.fillText(this.text, this.posX - (ctx.measureText(this.text).width / 2), this.posY + - (parseInt(ctx.font) / 2));
};

