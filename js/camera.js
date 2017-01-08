var Camera = function(width, height, maxX, maxY) {
    this.posX = 0;
    this.posY = 0;
    this.width = width;
    this.height = height;
    this.maxX = maxX;
    this.maxY = maxY;
};

Camera.prototype.update = function() {
    this.posX = player.posX - this.width / 2;
    this.posY = player.posY - this.height / 2;

    this.posX = Math.max(0, Math.min(this.maxX, this.posX));
    this.posY = Math.max(0, Math.min(this.maxY, this.posY));
};