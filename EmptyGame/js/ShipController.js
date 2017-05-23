class ShipController {
    constructor(x, y, spriteName, bulletName, configs) {
        this.sprite = Nakama.game.add.sprite(x, y, "assets", spriteName);
        this.bulletName = bulletName;
        this.configs = configs;

        this.gun = new (function(ship) {
            this.reloadTime = 7;
            this.reloadCount = 0,
            this.bullets = [];

            this.fire = function() {
                this.reloadCount += 1;
                if (this.reloadCount >= this.reloadTime) {
                    this.reloadCount = 0;
                    let foo = new BulletController(ship.sprite.x, ship.sprite.y, ship.bulletName);
                    foo.sprite.y -= foo.sprite.height;
                    foo.sprite.x += (ship.sprite.width - foo.sprite.width) / 2;
                    this.bullets.push(foo);
                }
            },

            this.update = function() {
                if (this.reloadCount < this.reloadTime){
                    this.reloadCount += 1;
                }
                this.bullets = this.bullets.filter((foo) => foo.display);
                for (let it of this.bullets) {
                    it.update();
                }
            }
        })(this);
    }

    update() {
        if (Nakama.keyboard.isDown(this.configs.UP)) {
            this.sprite.y -= Nakama.configs.PLAYER_SPEED;
        }
        if (Nakama.keyboard.isDown(this.configs.DOWN)) {
            this.sprite.y += Nakama.configs.PLAYER_SPEED;
        }
        if (Nakama.keyboard.isDown(this.configs.LEFT)) {
            this.sprite.x -= Nakama.configs.PLAYER_SPEED;
        }
        if (Nakama.keyboard.isDown(this.configs.RIGHT)) {
            this.sprite.x += Nakama.configs.PLAYER_SPEED;
        }
        if (Nakama.keyboard.isDown(this.configs.FIRE)) {
            this.gun.fire();
        }
        this.sprite.x = Math.max(this.sprite.x, 0);
        this.sprite.y = Math.max(this.sprite.y, 0);
        this.sprite.x = Math.min(Nakama.game.width - this.sprite.width, this.sprite.x);
        this.sprite.y = Math.min(Nakama.game.height - this.sprite.height, this.sprite.y);
        this.gun.update();
    }
}
