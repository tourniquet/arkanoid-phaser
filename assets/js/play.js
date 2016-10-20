/* globals game, Phaser */

let playState = {
  create () {
    // set game background image
    game.add.image(0, 0, 'background')

    // set arcade physics
    game.physics.startSystem(Phaser.Physics.ARCADE)
    // We check bounds collisions against all walls other than the bottom one
    game.physics.arcade.checkCollision.down = false
    // add the physics engine to all the game objetcs
    game.world.enableBody = true

    // create paddle, and set collide with world margin
    this.paddle = game.add.sprite(400, game.height - 25, 'paddle')
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
    this.blockDestroy = game.add.audio('blockDestroy')
    this.gameOver = game.add.audio('gameOver')

    // create the tilemap
    this.map = game.add.tilemap('map')
    this.map.addTilesetImage('tileset')
    // create the layer, by specifying the name of the Tiled layer
    this.layer = this.map.createLayer('Tile Layer 1')

    this.blocks = game.add.group()
    // for index '2' we have empty/transparent tile, which will replace destroyed block
    this.map.createFromTiles(1, 2, 'block', this.layer.index, this.blocks)
    game.physics.enable(this.blocks)
    this.blocks.setAll('body.immovable', true)

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
    game.physics.arcade.collide(this.ball, this.blocks, this.hitBrick, null, this)

    this.paddle.body.velocity.x = 0
    if (this.cursors.left.isDown) {
      this.paddle.body.velocity.x = -250
    } else if (this.cursors.right.isDown) {
      this.paddle.body.velocity.x = 250
    }
  },
  createBall () {
    // create ball
    this.ball = game.add.sprite(250, 350, 'ball')
    // give the ball some initial speed
    this.ball.body.velocity.x = 200
    this.ball.body.velocity.y = 200
    // make sure the ball will bounce when hitting something
    this.ball.body.bounce.setTo(1, 1)
    this.ball.body.collideWorldBounds = true
    // this check if ball it is within world every frame
    this.ball.checkWorldBounds = true
    // when ball is lost, call ballLost function
    this.ball.events.onOutOfBounds.add(this.ballLost, this)

    game.physics.arcade.enable(this.ball)
  },
  hitBrick (ball, block) {
    // play sound every time when ball destroy a block
    // this.blockDestroy.play()

    // increase our score by 5
    game.global.score += 5
    this.scoreLabel.text = `score: ${game.global.score}`

    // destroy block
    block.kill()
  },
  hitPaddle () {
    // when ball hit paddle, play sound
    // this.paddleTouch.play()
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
        // this.music.stop()
        // play a sound when user lose the game
        // this.gameOver.play()
        // call game over state
        game.state.start('gameOver')
      } else {
        this.createBall()
      }
    }
  }
  // ,
  // render () {
  //   game.debug.spriteInfo(this.ball, 50, 370)
  // }
}
