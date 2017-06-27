var Nakama = {};
Nakama.configs = {
  BACKGROUND_SPEED: 3
};

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

  Nakama.bulletGroup = Nakama.game.add.physicsGroup();
  Nakama.playerGroup = Nakama.game.add.physicsGroup();

  Nakama.player = new ShipType1Controller(250, 600, {
    UP: Phaser.Keyboard.UP,
    DOWN: Phaser.Keyboard.DOWN,
    LEFT: Phaser.Keyboard.LEFT,
    RIGHT: Phaser.Keyboard.RIGHT,
    FIRE: Phaser.Keyboard.CONTROL,
    BULLET_SPEED: Nakama.configs.BULLET_SPEED,
    BULLET_COUNT: 5
  });
  Nakama.partner = new ShipType1Controller(350, 600, {
    UP: Phaser.Keyboard.W,
    DOWN: Phaser.Keyboard.S,
    LEFT: Phaser.Keyboard.A,
    RIGHT: Phaser.Keyboard.D,
    FIRE: Phaser.Keyboard.SPACEBAR,
    BULLET_SPEED: Nakama.configs.BULLET_SPEED,
    BULLET_COUNT: 5
  });
}

var get_high = function() {
 Nakama.player.update();
 Nakama.partner.update();
}

var shift = 0;
var background_dance = function() {
  shift += Nakama.configs.BACKGROUND_SPEED;
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
