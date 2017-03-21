// Enemies our player must avoid
var boardWidth = 5;
var boardHeight = 6;
var tileWidth = 101;
var tileHeight = 83;
var playerInitialX = 202;
var playerInitialY = 415;
var gameWidth = tileWidth * boardWidth;
var gameHeight = tileHeight * boardHeight;

var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.initialX = x;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;
    if(this.x > gameWidth) {
      this.x = this.initialX;
    }

    if(this.x < player.x + tileWidth && this.x + tileWidth > player.x &&
       this.y < player.y + tileHeight && this.y + tileHeight > player.y)
    {
      player.x = playerInitialX;
      player.y = playerInitialY;
    }


};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function () {

};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (keyPress) {

  switch(keyPress) {
    case 'left':
      move(-tileWidth, 0);
      break;
    case 'up':
      move(0, -tileHeight);
      break;
    case 'right':
      move(tileWidth, 0);
      break;
    case 'down':
      move(0, tileHeight);
      break;
  }

  function move(deltaX, deltaY) {
    if(canMove(deltaX, deltaY)) {
      player.x += deltaX;
      player.y += deltaY;
    }
  }
  function canMove(deltaX, deltaY) {
    if(player.x + deltaX < 0 || player.x + deltaX > gameWidth - tileWidth) return;
    if(player.y + deltaY < 0 || player.y + deltaY > gameHeight - tileHeight) return;
    return true;
  }
};

function resetPlayer() {
  player.x = playerInitialX
  player.y = playerInitialY;

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemiesInitialPos = [
  {
    x: -tileWidth,
    y: tileHeight * 3 - 25,
    speed: 60
  },
  {
    x: -tileWidth,
    y: tileHeight * 3 - 25,
    speed: 100
  }
];
var allEnemies = [];
var player = new Player(playerInitialX, playerInitialY);
console.log(player);
enemiesInitialPos.forEach(function(enemy){
  var enemy = new Enemy(enemy.x, enemy.y, enemy.speed);
  allEnemies.push(enemy);
  console.log(enemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    if(allowedKeys[e.keyCode]) player.handleInput(allowedKeys[e.keyCode]);
});
