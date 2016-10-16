/* globals game, Phaser */

let gameOver = {
  create () {
    // display 'game over' text
    let gameOver = game.add.text(
      game.world.centerX, 200, 'Game over',
      { font: '50px Arial', fill: '#ffffff' }
    )
    gameOver.anchor.setTo(0.5, 0.5)

    // explain how to restart the game
    let restartGame = game.add.text(
      game.world.centerX, 400, 'click to restart the game',
      { font: '20px Arial', fill: '#ffffff' }
    )
    restartGame.anchor.setTo(0.5, 0.5)

    // click to start game
    game.input.onDown.add(this.startGame, this)
  },
  startGame () {
    game.state.start('play')
  }
}
