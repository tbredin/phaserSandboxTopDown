import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)

    //
    // load assets here
    //
    this.load.tilemap('level01', 'pilgrim/assets/tilemaps/tiled01.json', null, Phaser.Tilemap.TILED_JSON)
    this.load.image('gameTilesCliffSet', 'pilgrim/assets/images/Hanzo-CliffSet02VS-1.png')
    this.load.atlasJSONHash('pilgrim_walk', 'pilgrim/assets/images/pilgrim_walk.png', 'pilgrim/assets/spritemaps/pilgrim_walk.json');
  }

  create () {
    this.state.start('Game')
  }
}
