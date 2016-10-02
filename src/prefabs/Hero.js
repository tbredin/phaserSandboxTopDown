import Phaser from 'phaser'

export default class extends Phaser.Sprite {
    constructor ({game, x, y, asset, walkSpeed, jumpSpeed}) {
        super(game, x, y, asset);

        // Phaser.Sprite.call(this);
        this.game = game;

        this.walkSpeed = walkSpeed;
        this.jumpSpeed = jumpSpeed;
        this.isJumping = false;


        this.pixelScale = 2;
        this.anchor.x = 0.5;
        this.anchor.y = 1;
        this.scale.setTo(this.pixelScale, this.pixelScale);

        //  Here we add a new animation called 'walk'
        //  Because we didn't give any other parameters it's going to make an animation from all available frames in the 'mummy' sprite sheet
        var walk = this.animations.add('walk');

        //the camera will follow the player in the world
        this.game.camera.follow(this);
        this.game.physics.arcade.enable(this);

        //move player with cursor keys
        this.cursors = this.game.input.keyboard.createCursorKeys();
    }

    update () {
        this.game.physics.arcade.collide(this, this.game.blockedLayer);

        this.animations.play(this.checkState(this), 10, true);

        //player movement
        // set velocity as combination of keyboard vectors
        this.body.velocity.x = (this.cursors.right.isDown - this.cursors.left.isDown) * this.walkSpeed;
        this.body.velocity.y = (this.cursors.down.isDown - this.cursors.up.isDown) * this.walkSpeed;

        // flip sprite direction
        if (this.body.velocity.x > 0) {
            this.scale.setTo(this.pixelScale, this.pixelScale);
        } else if (this.body.velocity.x < 0) {
            this.scale.setTo(-this.pixelScale, this.pixelScale);
        }

        if (this.body.velocity.x == 0 && this.body.velocity.y == 0) {
          this.animations.stop();
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SHIFT) && !this.isJumping) {
            console.log('jump')
            this.body.velocity.y -= this.jumpSpeed;
            this.isJumping = true;
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && !this.isJumping) {
            console.log('attack')
            this.attack();
        }
    }

    checkState(sprite) {
        // ideally we would start referencing statemachine classes here,
        // but I haven't converted them yet; they use module pattern
        if (!sprite.isJumping) {
            return 'walk';
        } else {
            return 'jump';
        }
    }
}


