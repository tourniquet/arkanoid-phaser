/* globals game, Phaser */

let playState = {
  create () {
    // set game background color to black
    game.stage.backgroundColor = '#000'

    // set arcade physics
    game.physics.startSystem(Phaser.Physics.ARCADE)
    // add the physics engine to all the game objetcs
    game.world.enableBody = true

    // create paddle, and set collide with world margin
    this.paddle = game.add.sprite(400, 800, 'paddle')
    this.paddle.anchor.setTo(0.5, 0.5)
    game.physics.enable(this.paddle)
    this.paddle.body.collideWorldBounds = true
    this.paddle.body.immovable = true

    // create ball
    this.ball = game.add.sprite(200, 300, 'ball')
    // give the ball some initial speed
    this.ball.body.velocity.y = 200
    this.ball.body.velocity.x = 200
    // make sure the ball will bounce when hitting something
    this.ball.body.bounce.setTo(1)
    this.ball.body.collideWorldBounds = true

    // add sounds
    this.paddleTouch = game.add.audio('paddleTouch')
    this.brickDestroy = game.add.audio('brickDestroy')
    this.gameOver = game.add.audio('gameOver')

    // add background music
    this.music = game.add.audio('bgMusic')
    this.music.loop = true
    this.music.volume = 0.2
    this.music.play()

    // add bricks
    this.bricks = game.add.group()
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        let brick = game.add.sprite(55 + i * 60, 55 + j * 35, 'brick')
        brick.body.immovable = true
        this.bricks.add(brick)
      }
    }

    this.scoreLabel = game.add.text(
      20, 20, 'score: 0',
      { font: '20px Arial', fill: '#ffffff' }
    )

    game.global.score = 0

    // create cursors
    this.cursors = game.input.keyboard.createCursorKeys()
  },
  update () {
    // add collisions between the paddle and the ball
    game.physics.arcade.collide(this.paddle, this.ball)

    // call the 'hit' function when the ball hits a brick
    game.physics.arcade.collide(this.ball, this.bricks, this.hit, null, this)

    if (this.cursors.left.isDown) {
      this.paddle.body.velocity.x = -250
    } else if (this.cursors.right.isDown) {
      this.paddle.body.velocity.x = 250
    } else {
      this.paddle.body.velocity.x = 0
    }

    // kill the ball if player not hit them
    if (this.ball.y > this.paddle.y - 50) {
      this.ball.kill()
      // stop the music
      this.music.stop()
      // play a sound when user lose the game
      this.gameOver.play()
      game.state.start('gameOver')
    }
  },
  hit (ball, brick) {
    // play sound every time when ball destroy a brick
    this.brickDestroy.play()

    brick.kill()

    // increase our score by 5
    game.global.score += 5
    this.scoreLabel.text = `score: ${game.global.score}`
  }
}
