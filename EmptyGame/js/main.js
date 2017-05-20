var Nakama = {};
Nakama.configs = {};

window.onload = function(){
  Nakama.game = new Phaser.Game(640,960,Phaser.AUTO,'',
    {
      preload: preload,
      create: create,
      update: update,
      render: render
    }, false, false
  );
}

// preparations before game starts
var preload = function(){
  Nakama.game.scale.minWidth = 320;
  Nakama.game.scale.minHeight = 480;
  Nakama.game.scale.maxWidth = 640;
  Nakama.game.scale.maxHeight = 960;
  Nakama.game.scale.pageAlignHorizontally = true;
  Nakama.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

  Nakama.game.time.advancedTiming = true;

  Nakama.game.load.atlasJSONHash('assets', 'Assets/assets.png', 'Assets/assets.json');
  Nakama.game.load.image('background', 'Assets/Map1.png');
}

// initialize the game
var create = function(){
  Nakama.game.physics.startSystem(Phaser.Physics.ARCADE);
  Nakama.keyboard = Nakama.game.input.keyboard;

  var background = Nakama.game.add.sprite(0, 0, "background");
  Nakama.player = Nakama.game.add.sprite(300, 400, "assets", "Spaceship1-Player.png");
}

velocity = 1;
gain = 0.5;
last_dir = -1;

// update game state each frame
var update = function(){
    //Nakama.player.x += (Math.random() - Math.random()) * 10;
    //Nakama.player.y += (Math.random() - Math.random()) * 10;
    new_dir = -1;

    if (Nakama.keyboard.isDown(Phaser.Keyboard.UP)) {
        new_dir = 0;
        if (last_dir === new_dir) velocity += gain;
        Nakama.player.y -= velocity;
    }
    if (Nakama.keyboard.isDown(Phaser.Keyboard.DOWN)) {
        new_dir = 1;
        if (last_dir === new_dir) velocity += gain;
        Nakama.player.y += velocity;
    }
    if (Nakama.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        new_dir = 2;
        if (last_dir === new_dir) velocity += gain;
        Nakama.player.x -= velocity;
    }
    if (Nakama.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        new_dir = 3;
        if (last_dir === new_dir) velocity += gain;
        Nakama.player.x += velocity;
    }
    if (last_dir != new_dir) velocity = 1;
    last_dir = new_dir;

    Nakama.player.x = Math.max(Nakama.player.x, 0);
    Nakama.player.y = Math.max(Nakama.player.y, 0);
    Nakama.player.x = Math.min(Nakama.game.width - Nakama.player.width, Nakama.player.x);
    Nakama.player.y = Math.min(Nakama.game.height - Nakama.player.height, Nakama.player.y);
}

// before camera render (mostly for debug)
var render = function(){}
