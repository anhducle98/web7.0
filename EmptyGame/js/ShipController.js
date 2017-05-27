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
        if (this.timeSinceLastFire >= this.configs.COOLDOWN) {
            for (let i = 0; i < this.configs.BULLET_COUNT; ++i) {
                let diff = Number(i - (this.configs.BULLET_COUNT - 1) / 2.0);
                let angle = diff / this.configs.BULLET_COUNT;
                new BulletController(this.sprite.x, this.sprite.y, this.bulletName, {
                    deltaY: this.configs.BULLET_SPEED * Math.cos(angle),
                    deltaX: this.configs.BULLET_SPEED * Math.sin(angle),
                    rotation: angle / 3.14 * 180
                });
            }
            
            this.timeSinceLastFire = 0;
        }
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
