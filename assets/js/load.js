/* globals game, Phaser */

let loadState = {
  preload () {
    // background for menu
    game.load.image('background', 'assets/images/background.png')
    // lad tile, tilemap
    game.load.image('tileset', 'assets/images/tileset.png')
    game.load.tilemap('map', 'assets/images/map.json', null, Phaser.Tilemap.TILED_JSON)
    // load game image assets
    game.load.image('paddle', 'assets/images/paddle.png')
    game.load.image('block', 'assets/images/block.png')
    game.load.image('ball', 'assets/images/ball.png')
    // load game audio assets
    game.load.audio('paddleTouch', ['assets/audio/paddle.mp3', 'assets/audio/paddle.ogg'])
    game.load.audio('blockDestroy', ['assets/audio/brick.mp3', 'assets/audio/brick.ogg'])
    game.load.audio('gameOver', ['assets/audio/dead.mp3', 'assets/audio/dead.ogg'])
  },
  create () {
    game.state.start('menu')
  }
}
