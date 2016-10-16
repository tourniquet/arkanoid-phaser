/* globals game, Phaser */

let menuState = {
  create () {
    game.add.image(0, 0, 'background')

    // display game name
    let gameName = game.add.text(game.world.centerX, 200, 'Arkanoid Phaser',
      { font: '50px Arial', fill: '#ffffff' }
    )
    gameName.anchor.setTo(0.5, 0.5)

    // explain how to start the game
    let startGame = game.add.text(game.world.centerX, 400, 'click to start game',
      { font: '20px Arial', fill: '#ffffff' }
    )
    startGame.anchor.setTo(0.5, 0.5)

    // click to start game
    game.input.onDown.add(this.startGame, this)
  },
  startGame () {
    game.state.start('play')
  }
}
