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
    this.load.tilemap('level01', this.assetPath + 'assets/tilemaps/level01.json', null, Phaser.Tilemap.TILED_JSON)
    this.load.image('gameTilesMaze', this.assetPath + 'assets/images/danktiles3.png')
    this.load.atlasJSONHash('pilgrim_walk', this.assetPath + 'assets/images/pilgrim_walk.png', this.assetPath + 'assets/spritemaps/pilgrim_walk.json');
    this.load.atlasJSONHash('pilgrim_roll', this.assetPath + 'assets/images/pilgrim_roll.png', this.assetPath + 'assets/spritemaps/pilgrim_roll.json');
    this.load.image('green_stand', this.assetPath + this.assetPath + 'assets/images/green_stand.png')
    this.load.atlasJSONHash('green_run', this.assetPath + 'assets/images/green_run.png', this.assetPath + 'assets/spritemaps/green_run.json');
  }

  create () {
    this.state.start('Game')
  }
}
