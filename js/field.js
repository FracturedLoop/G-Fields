var Field = function(bgImg, features) {
    var image = new Image();
    image.src = 'assets/' + bgImg;
    this.bg = image;
    this.features = features;
    this.width = image.width;
    this.height = image.height;
    this.cx = this.width / 2;
    this.cy = this.height / 2;
};

Field.prototype.update = function update() {
    this.features.forEach(function(feat) {
        feat.update();
    })
};

Field.prototype.render = function() {
    ctx.drawImage(this.bg, camera.posX, camera.posY, camera.width, camera.height, 0, 0, camera.width, camera.height);
    this.features.forEach(function(feat) {
        feat.render();
    })
};