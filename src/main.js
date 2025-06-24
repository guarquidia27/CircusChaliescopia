// Crear la app PIXI con auto-resize a pantalla completa
const app = new PIXI.Application({
    resizeTo: window,
    backgroundColor: 0x000000,
    antialias: false,
    resolution: window.devicePixelRatio || 1
});
document.body.appendChild(app.view);

// Cargar recursos
const loader = PIXI.Loader.shared;

loader
    .add('background', 'assets/images/background.png')
    .add('stage01', 'assets/images/stage01')
    .add('charlie', 'assets/images/CircusCharlieSheet1.gif')
    .add('music', 'assets/audio/stage1-4.mp3')
    .load(setup);

let charlie;
let music;
let keys = {};

function setup(loader, resources) {
    // Fondo
    const background = new PIXI.Sprite(resources.background.texture);
    background.anchor.set(0.5);
    background.x = app.screen.width / 2;
    background.y = app.screen.height / 2;
    app.stage.addChild(background);

    // Sprite personaje
    charlie = new PIXI.Sprite(resources.charlie.texture);
    charlie.anchor.set(0.5, 0.5);
    charlie.x = app.screen.width / 2;
    charlie.y = app.screen.height - 100;
    charlie.scale.set(2); // Escala un poco el sprite
    app.stage.addChild(charlie);

    // Música de fondo
    music = new Audio(resources.music.url);
    music.loop = true;
    music.volume = 0.5;
    music.play();

    // Eventos de teclado
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    // Game loop
    app.ticker.add(gameLoop);
}

function onKeyDown(e) {
    keys[e.code] = true;
}

function onKeyUp(e) {
    keys[e.code] = false;
}

function gameLoop(delta) {
    const speed = 5;

    if (keys["ArrowLeft"]) {
        charlie.x -= speed;
    }
    if (keys["ArrowRight"]) {
        charlie.x += speed;
    }
    if (keys["Space"] && charlie.isJumping !== true) {
        charlie.isJumping = true;
        let jumpHeight = 150;
        let jumpSpeed = 5;
        let initialY = charlie.y;

        // Simular salto
        const jump = () => {
            if (jumpHeight > 0) {
                charlie.y -= jumpSpeed;
                jumpHeight -= jumpSpeed;
                requestAnimationFrame(jump);
            } else {
                // Caída
                const fall = () => {
                    if (charlie.y < initialY) {
                        charlie.y += jumpSpeed;
                        requestAnimationFrame(fall);
                    } else {
                        charlie.y = initialY;
                        charlie.isJumping = false;
                    }
                };
                fall();
            }
        };
        jump();
    }
}
