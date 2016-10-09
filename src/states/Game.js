/* globals __DEV__ */
import Phaser from 'phaser'
import Hero from '../prefabs/Hero'
import {setResponsiveWidth} from '../utils'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this.map = this.game.add.tilemap('level01');

    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    this.map.addTilesetImage('Base', 'gameTilesMaze');

    //create layer
    this.layerBackground = this.map.createLayer('terrain-background');
    this.layerObstacles = this.map.createLayer('terrain-obstacles');
    this.layerOverlay = this.map.createLayer('terrain-overlays');

    //collision on layerObstacles
    this.map.setCollisionBetween(1, 100000, true, 'terrain-obstacles');

    //resizes the game world to match the layer dimensions
    this.layerBackground.resizeWorld();

    //create player
    let result = this.findObjectsByType('playerStart', this.map, 'objects-items');

    this.player = new Hero({
      game: this.game,
      x: result[0].x,
      y: result[0].y,
      asset: 'green_run',
      walkSpeed: 70,
      jumpSpeed: 110,
      fps: 8
    })


    this.game.add.existing(this.player);

    this.layerTop = this.map.createLayer('terrain-top');
    this.layerTop2 = this.map.createLayer('terrain-top-2');

    //the camera will follow the player in the world
    this.game.camera.follow(this.player);


    // // adding text
    // let banner = this.add.text(this.game.world.centerX, this.game.height - 30, 'Phaser + ES6 + Webpack')
    // banner.font = 'Nunito'
    // banner.fontSize = 40
    // banner.fill = '#77BFA3'
    // banner.anchor.setTo(0.5)

  }

  update () {
    this.game.physics.arcade.collide(this.player, this.layerObstacles);
  }

  //find objects in a Tiled layer that containt a property called "type" equal to a certain value
  findObjectsByType (type, map, layer) {
    var result = new Array();

    map.objects[layer].forEach(function(element){
      if(element.type === type) {

        //Phaser uses top left, Tiled bottom left so we have to adjust
        //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
        //so they might not be placed in the exact position as in Tiled
        element.y -= map.tileHeight;
        result.push(element);
      }
    });
    return result;
  }

  render () {
    if (__DEV__) {
      this.game.debug.font = '10px Courier'
      this.game.debug.spriteInfo(this.player, 32, 32)
    }
  }
}
