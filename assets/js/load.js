/* globals game */

let loadState = {
  preload () {
    // background for menu
    game.load.image('background', 'assets/images/background.png')
    // load game image assets
    game.load.image('paddle', 'assets/images/paddle.png')
    game.load.image('brick', 'assets/images/brick.png')
    game.load.image('ball', 'assets/images/ball.png')
    // load game audio assets
    game.load.audio('bgMusic', ['assets/audio/music.mp3', 'assets/audio/music.ogg'])
    game.load.audio('paddleTouch', ['assets/audio/paddle.mp3', 'assets/audio/paddle.ogg'])
    game.load.audio('brickDestroy', ['assets/audio/brick.mp3', 'assets/audio/brick.ogg'])
    game.load.audio('gameOver', ['assets/audio/dead.mp3', 'assets/audio/dead.ogg'])
  },
  create () {
    game.state.start('menu')
  }
}
