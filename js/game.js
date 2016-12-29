// set up the canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var keys = [];
var ships = [];
var projectiles = [];
var animationFrame = 0;

function setup() {
    keys = [];
    ships = [];
    projectiles = [];
    animationFrame = 0;

    // create the player and the enemy
    var player = new Ship('ship-sprites.png', 32, 32, (canvas.width * 0.6) * Math.random() + 0.2 * canvas.width, (canvas.height * 0.6) * Math.random() + 0.2 * canvas.height);
    var enemy = new Ship('ship-sprites.png', 32, 32, (canvas.width * 0.6) * Math.random() + 0.2 * canvas.width, (canvas.height * 0.6) * Math.random() + 0.2 * canvas.height);

    // specify controls for player
    player.readControls = function () {
        if (keys[37]) {
            this.rot -= 0.05;
        }
        else if (keys[39]) {
            this.rot += 0.05;
        }
        if (keys[38]) {
            this.accel(0.1);
            this.isThrusting = true;
        }
        else {
            this.isThrusting = false;
        }
        if (keys[40] && new Date() - this.lastFired > 1000) {
            this.fire();
        }
    }

// specify controls for enemy
    enemy.readControls = function () {
        if (keys[65]) {
            this.rot -= 0.05;
        }
        else if (keys[68]) {
            this.rot += 0.05;
        }
        if (keys[87]) {
            this.accel(0.1);
            this.isThrusting = true;
        }
        else {
            this.isThrusting = false;
        }
        if (keys[83] && new Date() - this.lastFired > 1000) {
            this.fire();
        }
    };

    ships.forEach(function (shi) {
        shi.velX = 0, shi.velY = 0, shi.rot = Math.random() * 2 * Math.PI;
        shi.health = shi.maxHealth;
    });
}

setup();
window.addEventListener("keydown", function (event) {
    keys[event.keyCode] = true;
    if (event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40 || event.keyCode == 65 || event.keyCode == 68 || event.keyCode == 87 || event.keyCode == 32 || event.keyCode == 75) {
        event.preventDefault();
    }
}, true);

window.addEventListener("keyup", function (event) {
    delete keys[event.keyCode];
}, true);

window.addEventListener('resize', function (e) {
    console.log('resized');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});