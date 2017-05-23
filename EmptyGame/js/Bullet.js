class Bullet {
    constructor(x, y, fileName) {
        this.sprite = Nakama.game.add.sprite(x, y, "assets", fileName);
        this.display = true;
    }

    update() {
        this.sprite.y -= 17;
        if (this.sprite.y < 0) {
            this.display = false;
            this.sprite.destroy();
        }
    }
}
