import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)

    if (__DEV__) {
        this.assetPath = '';
    } else {
        this.assetPath = 'pilgrim2/';
    }

    //
    // load assets here
    //
    this.load.tilemap('level01', this.assetPath + 'assets/tilemaps/tiled01.json', null, Phaser.Tilemap.TILED_JSON)
    this.load.image('gameTilesCliffSet', this.assetPath + 'assets/images/Hanzo-CliffSet02VS-1.png')
    this.load.atlasJSONHash('pilgrim_walk', this.assetPath + 'assets/images/pilgrim_walk.png', this.assetPath + 'assets/spritemaps/pilgrim_walk.json');
    this.load.atlasJSONHash('pilgrim_roll', this.assetPath + 'assets/images/pilgrim_roll.png', this.assetPath + 'assets/spritemaps/pilgrim_roll.json');
  }

  create () {
    this.state.start('Game')
  }
}
