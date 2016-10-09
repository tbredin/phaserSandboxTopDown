import Phaser from 'phaser'
import WebFont from 'webfontloader'
import { assetPath } from '../utils'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#222'
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)

  }

  preload () {
    // scale the game 2x
    this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    this.game.scale.setUserScale(2, 2);

    // enable crisp rendering
    this.game.renderer.renderSession.roundPixels = true;
    Phaser.Canvas.setImageRenderingCrisp(this.game.canvas)
    this.game.stage.smoothed = false;
    this.game.renderer.renderSession.roundPixels = true

    WebFont.load({
      google: {
        families: ['Roboto']
      },
      active: this.fontsLoaded
    })

    let text = this.add.text(
      this.world.centerX,
      this.world.centerY,
      'loading fonts',
      {
        font: '9px Arial',
        fill: '#dddddd',
        align: 'center'
      }
    )

    text.anchor.setTo(0.5, 0.5)

    this.load.image('loaderBg', assetPath() + 'assets/images/loader-bg.png')
    this.load.image('loaderBar', assetPath() + 'assets/images/loader-bar.png')
  }

  render () {
    if (this.fontsReady) {
      this.state.start('Splash')
    }
  }

  fontsLoaded () {
    this.fontsReady = true
  }
}
