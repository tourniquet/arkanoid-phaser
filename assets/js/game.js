/* globals Phaser */

let game = new Phaser.Game(400, 600, Phaser.AUTO)

game.global = {
  score: 0
}

game.state.add('boot', bootState)
game.state.add('load', loadState)
game.state.add('menu', menuState)
game.state.add('play', playState)
game.state.add('gameOver', gameOver)

game.state.start('boot')
