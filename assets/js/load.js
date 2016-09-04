/* globals game */

let loadState = {
  preload () {
    // background for menu
    game.load.image('background', 'assets/images/background.png')
    // load game assets
    game.load.image('paddle', 'assets/images/paddle.png')
    game.load.image('brick', 'assets/images/brick.png')
    game.load.image('ball', 'assets/images/ball.png')
  },
  create () {
    game.state.start('menu')
  }
}
