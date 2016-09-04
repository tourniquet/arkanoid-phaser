/* globals game, Phaser */

let menuState = {
  preload () {
    // background for menu
    game.load.image('background', 'assets/images/background.png')
  },
  create () {
    game.add.image(0, 0, 'background')

    // display game name
    let gameName = game.add.text(game.world.centerX, 200, 'Arkanoid Phaser',
      { font: '50px Arial', fill: '#ffffff' }
    )
    gameName.anchor.setTo(0.5, 0.5)

    // explain how to start the game
    let startGame = game.add.text(game.world.centerX, 400, 'press enter to start',
      { font: '20px Arial', fill: '#ffffff' }
    )
    startGame.anchor.setTo(0.5, 0.5)

    // create Phaser keyboard hotkey
    const enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
    // start game on press enter
    enterKey.onDown.addOnce(this.startGame, this)
  },
  startGame () {
    game.state.start('play')
  }
}
