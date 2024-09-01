import { Sitting, Running, Jumping, Falling } from '../managers/playerState.js';

const images = {
    0: punk_sprite_idle,
    1: punk_sprite_running,
    2: punk_sprite_jump,
    3: punk_sprite_idle
}

export class Player {
    constructor(game) {
        this.game = game;
        this.height = 48;
        this.width = 48;
        this.x = 0;
        this.vy = 0;
        this.y = this.game.height - this.height;
        this.weight = 1;
        this.image = punk_sprite_idle;
        this.frameX = 0;
        this.frameY = 0;
        this.speed = 0;
        this.maxSpeed = 10;
        this.ySpeed = 10;
        this.states = [new Sitting(this), new Running(this), new Jumping(this), new Falling(this)];
        this.currentState = this.states[0];
        this.currentState.enter()
    };

    update(input) {
        this.currentState.handleInput(input)
        this.x += this.speed;

        if (input.includes('ArrowRight')) {
            this.speed = this.maxSpeed
        }
        else if (input.includes('ArrowLeft')) {
            this.speed = -this.maxSpeed
        }
        else {
            this.speed = 0;
        };

        if (this.x < 0) {
            this.x = 0
        }
        else if (this.x > this.game.width - this.width) {
            this.x = this.game.width - this.width
        }

        this.y += this.vy;
        if (!this.onGround()) {
            this.vy += this.weight
        }
        else {
            this.vy = 0;
        }

    };

    draw(context) {
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    };

    onGround() {
        return this.y >= this.game.height - this.height;
    };

    setState(state) {        
        this.image = images[state]
        this.currentState = this.states[state];
        this.currentState.enter();
    };
}