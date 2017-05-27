class BulletController {
    constructor(x, y, fileName, configs) {
        this.sprite = Nakama.bulletGroup.create(x, y, "assets", fileName);
        this.configs = configs;
        this.sprite.checkWorldBounds = true;
        this.sprite.outOfBoundsKill = true;
        this.sprite.body.velocity.x = this.configs.deltaX;
        this.sprite.body.velocity.y = -this.configs.deltaY;
        this.sprite.angle = this.configs.rotation;
        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        this.configs = configs;
    }
}
