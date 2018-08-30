'use strict';

function Game() {
  var self = this;

  self.gameIsOver = false;
  self.score = 0;
  self.pause = false;
  self.username = idName;
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
        <div class='username'>
          <p></p>
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

  self.usernameElement = self.gameMain.querySelector('.username p');
  self.usernameElement.innerText = self.username;
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
  document.body.addEventListener('keydown', self.handleKeySpace);

  self.enemies = [];
  self.points = [];

  self.startLoop();
}


Game.prototype.startLoop = function () {
  var self = this;

  var ctx = self.canvasElement.getContext('2d');

  if (!self.paused) {

    function loop() {
      // create more enemies now and then
      if (Math.random() > 0.95) {
        var y = self.canvasElement.height * Math.random();
        self.enemies.push(new Enemy(self.canvasElement, y, 5));
      }
      // create more points now and then
      if (Math.random() > 0.99) {
        var y = self.canvasElement.height * Math.random();
        self.points.push(new Points(self.canvasElement, y, 5));
      }
  
      // update its position
      self.player.update();
  
      // for each enemy update its position
      self.enemies.forEach(function(item) {
        item.update();
      });
  
      self.points.forEach(function(item) {
        item.update();
      });
  
      // check if player collide with enemy
      self.checkIfEnemiesCollidedPlayer ();
      self.checkIfPointsCollidedPlayer ();
      // - loose life or win points
      self.livesElement.innerText = self.player.lives;
      self.scoreElement.innerText = self.score;
      // - remove the enemy player collided wuth
  
  
      // forget enemies already outside the screen
      self.enemies = self.enemies.filter(function(item) {
        return item.isInScreen();
      });
  
      self.points = self.points.filter(function(item) {
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
  
      self.points.forEach(function(item) {
        item.draw();
      });
  
      if(!self.gameIsOver) {
        window.requestAnimationFrame(loop);
      }
    }
    window.requestAnimationFrame(loop);
  }
  

};


Game.prototype.handleKeySpace = function (event) {
  var self = this;

  if(event.key === ' ') {
    self.togglePause();
  }
};


Game.prototype.togglePause = function () {
  var self = this;

  if(!self.pause) {
    pause = true;
  } else {
    pause = false;
  }
};


Game.prototype.checkIfPointsCollidedPlayer = function () {
  var self = this;

  self.points.forEach(function (item, index) {
    if (self.player.collidesWithEnemy(item)) {
      self.points.splice(index, 1);
      self.score++;
    };
  });
};

Game.prototype.checkIfEnemiesCollidedPlayer = function () {
  var self = this;

  self.enemies.forEach(function (item, index) {
    if (self.player.collidesWithEnemy(item)) {
      self.player.collided();
      self.enemies.splice(index, 1);

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
