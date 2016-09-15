/* globals game, Phaser */

let playState = {
  create () {
    // set game background color to black
    game.stage.backgroundColor = '#000'

    // set arcade physics
    game.physics.startSystem(Phaser.Physics.ARCADE)
    // We check bounds collisions against all walls other than the bottom one
    game.physics.arcade.checkCollision.down = false
    // add the physics engine to all the game objetcs
    game.world.enableBody = true

    // create paddle, and set collide with world margin
    this.paddle = game.add.sprite(400, 800, 'paddle')
    this.paddle.anchor.setTo(0.5, 0.5)
    game.physics.enable(this.paddle)
    this.paddle.body.collideWorldBounds = true
    this.paddle.body.immovable = true

    // call createBall function
    this.createBall()

    // lives count
    this.lives = 3

    // add lives label
    this.livesLabel = game.add.text(
      290, 20, 'lives: 3',
      { font: '20px Arial', fill: '#ffffff' }
    )

    // add sounds
    this.paddleTouch = game.add.audio('paddleTouch')
    this.brickDestroy = game.add.audio('brickDestroy')
    this.gameOver = game.add.audio('gameOver')

    // add bricks
    // this.bricks = game.add.group()
    // for (let i = 0; i < 5; i++) {
    //   for (let j = 0; j < 5; j++) {
    //     let brick = game.add.sprite(55 + i * 60, 55 + j * 35, 'brick')
    //     brick.body.immovable = true
    //     this.bricks.add(brick)
    //   }
    // }

    // create the tilemap
    this.map = game.add.tilemap('map')
    // add the tileset to the map
    this.map.addTilesetImage('block')
    // create the layer, by specifying the name of the Tiled layer
    this.layer = this.map.createLayer('Tile Layer 1')
    // set the world size to match the size of the layer
    this.layer.resizeWorld()
    // enable collisions for the block
    this.map.setCollision(1)

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
    game.physics.arcade.collide(this.paddle, this.ball, this.hitPaddle, null, this)

    // call the 'hitBrick' function when the ball hits a brick
    game.physics.arcade.collide(this.ball, this.layer, this.hitBrick, null, this)

    if (this.cursors.left.isDown) {
      this.paddle.body.velocity.x = -250
    } else if (this.cursors.right.isDown) {
      this.paddle.body.velocity.x = 250
    } else {
      this.paddle.body.velocity.x = 0
    }
  },
  createBall () {
    // create ball
    this.ball = game.add.sprite(200, 300, 'ball')
    // give the ball some initial speed
    this.ball.body.velocity.y = 200
    this.ball.body.velocity.x = 200
    // make sure the ball will bounce when hitting something
    this.ball.body.bounce.setTo(1)
    this.ball.body.collideWorldBounds = true
    // this check if ball it is within world every frame
    this.ball.checkWorldBounds = true
    // when ball is lost, call ballLost function
    this.ball.events.onOutOfBounds.add(this.ballLost, this)
  },
  hitBrick (ball, brick) { // rename to hit brick
    // play sound every time when ball destroy a brick
    this.brickDestroy.play()
    // destroy hit brick
    brick.destroy()

    // increase our score by 5
    game.global.score += 5
    this.scoreLabel.text = `score: ${game.global.score}`
  },
  hitPaddle () {
    // when ball hit paddle, play sound
    this.paddleTouch.play()
  },
  ballLost () {
    if (this.ball.y > this.paddle.y - 50) {
      // kill the ball if player not hit them
      this.ball.kill()

      // if user lost ball, decrement lives variable
      this.lives--
      this.livesLabel.text = `lives: ${this.lives}`

      if (!this.lives) {
        // stop the music
        this.music.stop()
        // play a sound when user lose the game
        this.gameOver.play()
        // call game over state
        game.state.start('gameOver')
      } else {
        this.createBall()
      }
    }
  }
}
