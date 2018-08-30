'use strict';

var idName;

function buildDom(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.children[0];
}

function main() {

  var splashMain;
  var gameOverMain;

  var game; // instance of Game

  // -- splash

  function buildSplash() {

    splashMain = buildDom(`
      <main>
        <h1>Eternal Enemies</h1>
        <div>
        <label>Username :</label>
        <input type="text" placeholder='Who do you hate most?'> 
        </div>
        <button>Start</button>
      </main>
    `);
    
    document.body.appendChild(splashMain);


    var input = document.querySelector('input');
    input.addEventListener('keyup', function(event) {
        idName = getUsername(input);
    });
    var button = splashMain.querySelector('button');
    button.addEventListener('click', startGame);

  }

  function getUsername(item) {
    var name = item.value;
    return name;
  };

  function destoySplash() {
    splashMain.remove();
  }

  
  // -- game

  function startGame() {
    destoySplash();
    destoyGameOver();

    game = new Game();
    game.start();
    game.onOver(function () {
      gameOver(game.score);
    });
  }

  function destroyGame() {
    game.destroy();
  }

  // -- game over 


  function gameOver(score) {
    destroyGame();
    buildGameOver(score);
  }

  function buildGameOver(score) {

    gameOverMain = buildDom(`
      <main>
        <h1>Game over</h1>
        <p>Hey <span class='username'></span> this is your score : <span class='score'></span></p>
        <button>Restart</button>
      </main>
    `);

    var button = gameOverMain.querySelector('button');
    button.addEventListener('click', startGame);    
    
    var span = gameOverMain.querySelector('.score');
    span.innerText = score;

    var name = gameOverMain.querySelector('.username');
    name.innerText = idName;

    document.body.appendChild(gameOverMain);
  }

  function destoyGameOver() {
    if (gameOverMain) {
      gameOverMain.remove();
    }
  }

  // -- initialize

  buildSplash();
}

window.addEventListener('load', main);