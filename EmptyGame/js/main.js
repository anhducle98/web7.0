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

  Nakama.upper_background = Nakama.game.add.sprite(0, 0, "background");
  Nakama.lower_background = Nakama.game.add.sprite(0, 0, "background");
  upper_crop = new Phaser.Rectangle(0, 0, Nakama.game.width, Nakama.game.height);
  lower_crop = new Phaser.Rectangle(0, 0, Nakama.game.width, Nakama.game.height);
  Nakama.upper_background.crop(upper_crop);
  Nakama.lower_background.crop(lower_crop);
  Nakama.player = Nakama.game.add.sprite(300, 400, "assets", "Spaceship1-Player.png");
  Nakama.player.velocity = 10;
}

var get_high = function() {
  if (Nakama.keyboard.isDown(Phaser.Keyboard.UP)) {
    Nakama.player.y -= Nakama.player.velocity;
  }
  if (Nakama.keyboard.isDown(Phaser.Keyboard.DOWN)) {
    Nakama.player.y += Nakama.player.velocity;
  }
  if (Nakama.keyboard.isDown(Phaser.Keyboard.LEFT)) {
    Nakama.player.x -= Nakama.player.velocity;
  }
  if (Nakama.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
    Nakama.player.x += Nakama.player.velocity;
  }
  Nakama.player.x = Math.max(Nakama.player.x, 0);
  Nakama.player.y = Math.max(Nakama.player.y, 0);
  Nakama.player.x = Math.min(Nakama.game.width - Nakama.player.width, Nakama.player.x);
  Nakama.player.y = Math.min(Nakama.game.height - Nakama.player.height, Nakama.player.y);
}

var shift = 0;
var background_dance = function() {
  shift += 3;
  if (shift >= Nakama.game.height) {
    shift -= Nakama.game.height
  }
  upper_crop.y = Nakama.game.height - shift;
  upper_crop.height = shift;
  lower_crop.height = Nakama.game.height - shift;
  Nakama.lower_background.y = shift;
  Nakama.upper_background.updateCrop();
  Nakama.lower_background.updateCrop();  
}

// update game state each frame
var update = function(){
  get_high();
  background_dance();
}

// before camera render (mostly for debug)
var render = function(){}
