'use strict';

function Game() {
  var self = this;

  self.gameIsOver = false;
}

Game.prototype.start = function () {
  var self = this;

  self.gameMain = buildDom(`
    <main class="game container">
      <header>
        <div class="lives">
          <span class="label">Lives:</span>
          <span class="value"></span>
        </div>
        <div class="score">
          <span class="label">Score:</span>
          <span class="value"></span>
        </div>
      </header>
      <div class="canvas">
        <canvas></canvas>
      </div>
    </main>
  `);

  self.canvasParentElement = self.gameMain.querySelector('.canvas');
  self.canvasElement = self.gameMain.querySelector('canvas');

  self.livesElement = self.gameMain.querySelector('.lives .value');
  self.scoreElement = self.gameMain.querySelector('.score .value');

  document.body.appendChild(self.gameMain);

  self.width = self.canvasParentElement.offsetWidth;
  self.height = self.canvasParentElement.offsetHeight;

  self.canvasElement.setAttribute('width', self.width);
  self.canvasElement.setAttribute('height', self.height);

  self.player = new Player(self.canvasElement, 5);

  self.handleKeyDown = function(event) {
    if (event.key === 'ArrowUp') {
      self.player.setDirection(-1);
    } else if (event.key === 'ArrowDown') {
      self.player.setDirection(1);
    }
  }

  document.body.addEventListener('keydown', self.handleKeyDown);

  var height = self.canvasElement.height;
  self.enemies = [];

  self.startLoop();
}

Game.prototype.startLoop = function () {
  var self = this;

  var ctx = self.canvasElement.getContext('2d');

  function loop() {
    // create more enemies now and then
    if (Math.random() > 0.99) {
      var y = self.canvasElement.height * Math.random();
      self.enemies.push(new Enemy(self.canvasElement, y, 5));
    }

    // update its position
    self.player.update();

    // for each enemy update its position
    self.enemies.forEach(function(item) {
      item.update();
    });

    // check if player collide with enemy
    self.checkIfEnemiesCollidedPlayer ();
    // - loose life
    // - check no more lifes left --- game-over
    // - remove the enemy player collided wuth


    // forget enemies already outside the screen
    self.enemies = self.enemies.filter(function(item) {
      return item.isInScreen();
    });


    // erase canvas
    ctx.clearRect(0, 0, self.width, self.height);
    // draw the player
    self.player.draw();

    // draw all the enemies
    self.enemies.forEach(function(item) {
      item.draw();
    });

    if(!self.gameIsOver) {
      window.requestAnimationFrame(loop);
    }
  }
  
  window.requestAnimationFrame(loop);

};

Game.prototype.checkIfEnemiesCollidedPlayer = function () {
  var self = this;

  self.enemies.forEach(function (item) {
    if (self.player.collidesWithEnemy(item)) {
      self.player.collided();

      if (!self.player.lives) {
        self.gameOver();
      }
    };
  });
};

Game.prototype.onOver = function (callback) {
  var self = this;

  self.onGameOverCallback = callback;
};

Game.prototype.gameOver = function () {
  var self = this;

  self.gameIsOver = true;
  self.onGameOverCallback();
};

Game.prototype.destroy = function () {
  var self = this;
  
  self.gameMain.remove();
};
