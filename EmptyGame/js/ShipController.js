class ShipController {
    constructor(x, y, spriteName, bulletName, configs) {
        this.sprite = Nakama.playerGroup.create(x, y, "assets", spriteName);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        this.bulletName = bulletName;
        this.configs = configs;
        this.timeSinceLastFire = 0;
    }

    fire() {
        
    }

    update() {
        if (Nakama.keyboard.isDown(this.configs.UP)) {
            this.sprite.body.velocity.y = -Nakama.configs.PLAYER_SPEED;
        } else if (Nakama.keyboard.isDown(this.configs.DOWN)) {
            this.sprite.body.velocity.y = +Nakama.configs.PLAYER_SPEED;
        } else {
            this.sprite.body.velocity.y = 0;
        }

        if (Nakama.keyboard.isDown(this.configs.LEFT)) {
            this.sprite.body.velocity.x = -Nakama.configs.PLAYER_SPEED;
        } else if (Nakama.keyboard.isDown(this.configs.RIGHT)) {
            this.sprite.body.velocity.x = +Nakama.configs.PLAYER_SPEED;
        } else {
            this.sprite.body.velocity.x = 0;
        }

        this.timeSinceLastFire += Nakama.game.time.physicsElapsed;
        if (Nakama.keyboard.isDown(this.configs.FIRE)) {
            this.fire();
        }
    }
}
