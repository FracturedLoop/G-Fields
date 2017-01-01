var appState = 'loading';
var mainMenu;
var pauseMenu;
var mouse = {
    posX: 0,
    posY: 0,
    isDown: false
};

Engine = (function (global) {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');


    function main() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (keys[27] && appState == 'running') {
            appState = 'paused';
        }

        update();
        render();

        window.requestAnimationFrame(main);
    }

    function init() {
        appState = 'init';
        var mainMenuBtns = [new Button(15, 400, 200, 50, 'start', function() {
            setup();
            appState = 'running';
        })];

        var mainMenuGraphics = [new MenuImage('logo.png', 15, 15, canvas.width / 3, canvas.width / 4.27)];
        mainMenu = new Menu(mainMenuBtns, mainMenuGraphics, []);

        var pauseBtns = [new Button(canvas.width / 2 - 100, 200, 200, 50, 'resume', function() {
            appState = 'running';
        }), new Button(canvas.width / 2 - 100, 300, 200, 50, 'Exit to menu', function() {
            appState = 'main menu';
        })];

        var pauseText = [new MenuText(canvas.width / 2, 100, 'Paused', 48)];

        pauseMenu = new Menu(pauseBtns, [], pauseText);

        main();
        appState = 'main menu';
    }

    function update() {
        updateEntities();
    }

    function updateEntities() {
        switch (appState) {
            case 'running':
                ships.forEach(function (ship) {
                    ship.update();
                });
                projectiles.forEach(function (entity) {
                    entity.update();
                });
                break;
            case 'main menu':
                mainMenu.update();
                break;
            case 'paused':
                pauseMenu.update();
                break;
            case 'init':
                break;
            default:
                console.log('something broke ' + appState);
        }
    }

    function render() {

        switch (appState) {
            case 'running':
                renderEntities();
                if (animationFrame < 60) {
                    animationFrame++;
                }
                else {
                    animationFrame = 0;
                }
                break;
            case 'main menu':
                mainMenu.render();
                break;
            case 'paused':
                pauseMenu.render();
                break;
            case 'init':
                break;
        }
    }

    function renderEntities() {
        projectiles.forEach(function (proj) {
            proj.render();
        });
        ships.forEach(function (ship) {
            ship.render();
        });
    }

    global.canvas = canvas;
    global.ctx = ctx;

    canvas.addEventListener('mousemove', function(e) {
        mouse.posX = e.clientX;
        mouse.posY = e.clientY;
    });
    canvas.addEventListener('mousedown', function(e) {
        mouse.isDown = true;
    });
    canvas.addEventListener('mouseup', function(e) {
        mouse.isDown = false;
    });

    window.onload = init;
})(this);