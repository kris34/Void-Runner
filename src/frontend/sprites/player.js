export  class Player {
    constructor(game) {
        this.game = game;
        this.height = 48;
        this.width = 48;
        this.x = 0;
        this.y = 0;
        this.image = document.getElementById('punk_sprite')
    };

    update(context) {

    };

    draw(context) {
        context.fillRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x, this.y);
    }
}