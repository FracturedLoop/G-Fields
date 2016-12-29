Engine = (function (global) {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    function main() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (keys[32]) {
            setup();
        }

        update();
        render();

        window.requestAnimationFrame(main);
    }

    function init() {
        main();
    }

    function update() {
        updateEntities();
    }

    function updateEntities() {
        ships.forEach(function (ship) {
            ship.update();
        });
        projectiles.forEach(function (entity) {
            entity.update();
        });
    }

    function render() {
        renderEntities();
        if (animationFrame < 60) {
            animationFrame++;
        }
        else {
            animationFrame = 0;
        }
    }

    function renderEntities() {
        ships.forEach(function (ship) {
            ship.render();
        });
        projectiles.forEach(function (proj) {
            proj.render();
        })
    }

    global.canvas = canvas;
    global.ctx = ctx;

    window.onload = init;
})(this);