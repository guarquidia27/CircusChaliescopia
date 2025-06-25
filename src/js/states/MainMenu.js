(function(){
'use strict';

/* global GameCtrl */
GameCtrl.MainMenu = function (/*game*/) {
    this.music = null;
    this.playButton = null;
};

GameCtrl.MainMenu.prototype = {

    preload: function(){
        
    },

    create: function () {
        // Agregar imagen de fondo
       var bg = this.game.add.sprite(0, 0, 'stage01');
        bg.scale.setTo(
        this.game.width / bg.width,
        this.game.height / bg.height
        );

       /* this.stage01 = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'stage01');
        this.background.fixedToCamera = true;*/



        var starsmenu = this.game.add.sprite(130, 100, 'starsmenu');
        starsmenu.scale.x = 5;
        starsmenu.scale.y = 5;

        var logo = this.game.add.sprite(250, 170, 'logo');
        logo.scale.x = 0.8;
        logo.scale.y = 0.8;

        var textstyle = {
            font: '50px "arcadeclasic"',
            fill: '#fff',
            align: 'center'
        };

        this.startText = this.game.add.text(
            this.game.width / 2 - 180,
            this.game.height / 2 + 120,
            'Press  ENTER  to\n start playing',
            textstyle
        );

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        var clown = this.game.add.sprite(100, 600, 'clown');
        clown.scale.x = 4;
        clown.scale.y = 4;
        this.game.physics.enable(clown, Phaser.Physics.ARCADE);

        clown.body.velocity.x = 100;

        clown.animations.add('run', Phaser.Animation.generateFrameNames('clown', 0, 2, '', 4), 10, true);
        clown.animations.play('run', 8, true);

        this.enterPressed = false;
    },

    update: function () {
        if (!this.enterPressed && this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
            this.enterPressed = true;

            this.blinkedTimes = -1;
            this.timerBlinker = setInterval(function (_this) {
                _this.blinkedTimes++;
                if (_this.blinkedTimes > 10) {
                    clearInterval(_this.timerBlinker);
                    GameCtrl.data = { textToRender: 'STAGE 01', nextState: 'Stage01' };
                    _this.game.state.start('Prestage');
                }
                _this.startText.visible = !_this.startText.visible;
            }, 30, this);
        }
    }

};

})();
