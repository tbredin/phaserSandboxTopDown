import Phaser from 'phaser'

export default class extends Phaser.Sprite {
    constructor ({game, x, y, asset, walkSpeed, jumpSpeed}) {
        super(game, x, y, asset);

        // Phaser.Sprite.call(this);
        this.game = game;

        this.walkSpeed = walkSpeed;
        this.jumpSpeed = jumpSpeed;
        this.spriteState = 'standing';

        this.pixelScale = 2;
        this.anchor.x = 0.5;
        this.anchor.y = 1;
        this.scale.setTo(this.pixelScale, this.pixelScale);

        //  Here we add a new animation called 'walk'
        //  Because we didn't give any other parameters it's going to make an animation from all available frames in the 'mummy' sprite sheet
        this.animations.add('walking');
        this.animations.add('rolling');
        this.animations.add('jumping');
        this.animations.add('falling');

        //the camera will follow the player in the world
        this.game.camera.follow(this);
        this.game.physics.arcade.enable(this);

        //move player with cursor keys
        this.cursors = this.game.input.keyboard.createCursorKeys();
    }

    update () {
        this.game.physics.arcade.collide(this, this.game.blockedLayer);

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

        if (this.spriteState != 'rolling' && this.spriteState != 'jumping' && this.spriteState != 'falling') {
            if (this.body.velocity.x > 0 || this.body.velocity.x < 0 || this.body.velocity.y > 0 || this.body.velocity.y < 0) {
                this.spriteState = 'walking';
            } else if (this.body.velocity.x == 0 && this.body.velocity.y == 0) {
                this.spriteState = 'standing';
            }

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)) {
                this.spriteState = 'rolling';
            }

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                // this.body.velocity.y -= this.jumpSpeed;
                this.spriteState = 'jumping';
            }
        }

        if (this.lastSpriteState != this.spriteState) {
            this.handleSpriteStates();
            console.log(this.spriteState);
        }

        this.lastSpriteState = this.spriteState;
    }

    handleSpriteStates () {
        // console.log(this.animations.currentAnim)

        if (this.spriteState == 'walking') {
            this.loadTexture('pilgrim_walk', 0);
            this.animations.play('walking', 10, true);
        } else if (this.spriteState == 'jumping') {
            this.loadTexture('pilgrim_roll', 0);
            this.animations.play('jumping', 10, false);

            this.animations.currentAnim.onComplete.add(function (instance) {
                console.log('animEnd: to falling')

                instance.spriteState = 'falling';
            });
        } else if (this.spriteState == 'falling') {
            this.loadTexture('pilgrim_roll', 0);
            this.animations.play('falling', 10, false);

            this.animations.currentAnim.onComplete.add(function (instance) {
                console.log('animEnd: to standing')

                instance.spriteState = 'standing';
            });
        } else if (this.spriteState == 'rolling') {
            this.loadTexture('pilgrim_roll', 0);
            this.animations.play('rolling', 10, false);

            this.animations.currentAnim.onComplete.add(function (instance) {
                console.log('animEnd: to standing')

                instance.spriteState = 'standing';
            });
        } else {
            this.loadTexture('pilgrim_walk', 0);
            // default is standing
            this.animations.stop();
        }
    }
}


