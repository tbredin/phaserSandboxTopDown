var StateMachine = require('../state-machine.js');

import Phaser from 'phaser'

export default class extends Phaser.Sprite {
    constructor ({game, x, y, asset, walkSpeed, jumpSpeed, fps}) {
        super(game, x, y, asset);

        // Phaser.Sprite.call(this);
        this.game = game;

        let sprite = this;

        this.walkSpeed = walkSpeed;
        this.jumpSpeed = jumpSpeed;
        this.fps = fps;

        this.pixelScale = 1;
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

        // handle animations via stateMachine
        this.stateMachine = StateMachine.create({
            initial: 'standing',
            events: [
                { name: 'idle',     from: ['walking', 'rolling', 'falling'],                to: 'standing'  },
                { name: 'walk',     from: ['standing', 'rolling', 'falling'],               to: 'walking'   },
                { name: 'jump',     from: ['standing', 'walking'],                          to: 'jumping'   },
                { name: 'fall',     from: ['jumping', 'walking', 'rolling'],                to: 'falling'   },
                { name: 'roll',     from: ['standing', 'walking'],                          to: 'rolling'   }
            ],
            callbacks: {
                onidle:  function(event, from, to) {
                    console.log(this.current);

                    sprite.loadTexture('green_stand', 0, true);
                    sprite.animations.stop();
                },
                onwalk:  function(event, from, to) {
                    console.log(this.current);

                    sprite.loadTexture('green_run', 0);
                    sprite.animations.play('walking', sprite.fps, true);
                },
                onjump:  function(event, from, to) {
                    console.log(this.current);

                    sprite.loadTexture('pilgrim_roll', 0);
                    sprite.animations.play('jumping', sprite.fps * 1.75, false);

                    sprite.animations.currentAnim.onComplete.add(function () {
                        if (sprite.stateMachine.can('fall')) {
                            console.log('animEnd: to falling')
                            sprite.stateMachine.fall();
                        }
                    });
                },
                onfall:  function(event, from, to) {
                    console.log(this.current);

                    sprite.loadTexture('pilgrim_roll', 0);
                    sprite.animations.play('falling', sprite.fps * 1.75, false);

                    sprite.animations.currentAnim.onComplete.add(function () {
                        if (sprite.stateMachine.can('idle')) {
                            console.log('animEnd: to standing')
                            sprite.stateMachine.idle();
                        }
                    });
                },
                onroll:  function(event, from, to) {
                    console.log(this.current);

                    sprite.loadTexture('pilgrim_roll', 0);
                    sprite.animations.play('rolling', sprite.fps * 1.5, false);

                    sprite.animations.currentAnim.onComplete.add(function () {
                        if (sprite.stateMachine.can('idle')) {
                            console.log('animEnd: to standing')
                            sprite.stateMachine.idle();
                        }
                    });
                }
            }
        });
    }

    update () {

        // player movement
        // set velocity as combination of keyboard vectors, and create rudimentary jump
        // TODO use sine math for jump velocity, possibly ignore cursors y if jumping/falling
        this.body.velocity.x = (this.cursors.right.isDown - this.cursors.left.isDown) * this.walkSpeed
            + (this.stateMachine.current === 'rolling' ? (this.cursors.right.isDown - this.cursors.left.isDown) * this.walkSpeed : 0);

        this.body.velocity.y = (this.cursors.down.isDown - this.cursors.up.isDown) * this.walkSpeed
            - (this.stateMachine.current === 'jumping' ? this.jumpSpeed : 0)
            + (this.stateMachine.current === 'falling' ? this.jumpSpeed : 0)
            + (this.stateMachine.current === 'rolling' ? (this.cursors.down.isDown - this.cursors.up.isDown) * this.walkSpeed : 0);

        // flip sprite direction
        if (this.body.velocity.x > 0) {
            this.scale.setTo(this.pixelScale, this.pixelScale);
        } else if (this.body.velocity.x < 0) {
            this.scale.setTo(-this.pixelScale, this.pixelScale);
        }

        if (this.stateMachine.current != 'rolling' && this.stateMachine.current != 'jumping' && this.stateMachine.current != 'falling') {
            if (this.body.velocity.x > 0 || this.body.velocity.x < 0 || this.body.velocity.y > 0 || this.body.velocity.y < 0) {
                if (this.stateMachine.can('walk')) {
                    this.stateMachine.walk();
                }

            } else if (this.body.velocity.x == 0 && this.body.velocity.y == 0) {
                if (this.stateMachine.can('idle')) {
                    this.stateMachine.idle();
                }
            }

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)) {
                if (this.stateMachine.can('roll')) {
                    this.stateMachine.roll();
                }
            }

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                if (this.stateMachine.can('jump')) {
                    this.stateMachine.jump();
                }
            }
        }
    }
}


