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
    .add('stage01', 'assets/images/stage01.png')
    .add('stage02', 'assets/images/stage02.png')
    .add('charlie', 'assets/images/CircusCharlieSheet1.gif')
    .add('music', 'assets/audio/stage1-4.mp3')
    .load(setup);

let charlie;
let music;
let keys = {};
let currentStage = 1;
let background;
let stageTextures = {};
let message;

function setup(loader, resources) {
    stageTextures = {
        stage01: resources.stage01.texture,
        stage02: resources.stage02.texture
    };

    // Fondo inicial
    background = new PIXI.Sprite(stageTextures.stage01);
    background.anchor.set(0.5);
    background.x = app.screen.width / 2;
    background.y = app.screen.height / 2;
    app.stage.addChild(background);

    // Sprite personaje
    charlie = new PIXI.Sprite(resources.charlie.texture);
    charlie.anchor.set(0.5, 0.5);
    charlie.x = app.screen.width / 2;
    charlie.y = app.screen.height - 100;
    charlie.scale.set(2);
    app.stage.addChild(charlie);

    // Texto en pantalla
    const style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 24,
        fill: '#ffffff'
    });
    message = new PIXI.Text('Presiona Enter para cambiar stage', style);
    message.anchor.set(0.5);
    message.x = app.screen.width / 2;
    message.y = 50;
    app.stage.addChild(message);

    // Música
    music = new Audio(resources.music.url);
    music.loop = true;
    music.volume = 0.5;
    music.play();

    // Teclado
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

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

        const jump = () => {
            if (jumpHeight > 0) {
                charlie.y -= jumpSpeed;
                jumpHeight -= jumpSpeed;
                requestAnimationFrame(jump);
            } else {
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

    // Cambiar stage con Enter
    if (keys["Enter"]) {
        keys["Enter"] = false; // para que no repita
        currentStage = currentStage === 1 ? 2 : 1;
        background.texture = currentStage === 1 ? stageTextures.stage01 : stageTextures.stage02;
    }
}
