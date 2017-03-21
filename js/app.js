// Enemies our player must avoid
var boardWidth = 5;
var boardHeight = 6;
var tileWidth = 101;
var tileHeight = 83;
var tileImageHeight = 171;
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

    this.applySpeed(dt);
    this.checkCollisionWithPlayer();
};

Enemy.prototype.applySpeed = function (dt) {
  this.x += dt * this.speed;
  if(this.x > gameWidth) {
    this.x = this.initialX;
  }
}

Enemy.prototype.checkCollisionWithPlayer = function() {
  var bugRow = Math.ceil(this.y / tileHeight);
  var playerRow = player.y / tileHeight;
  if(this.x < player.x + tileWidth && this.x + tileWidth > player.x &&
    bugRow == playerRow
  ) {
    player.reset();
  }
}



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
  this.initialX = x;
  this.initialY = y;
  this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function () {

};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y - 30);
};

Player.prototype.handleInput = function (keyPress) {
  switch(keyPress) {
    case 'left':
      this.move(-tileWidth, 0);
      break;
    case 'up':
      this.move(0, -tileHeight);
      break;
    case 'right':
      this.move(tileWidth, 0);
      break;
    case 'down':
      this.move(0, tileHeight);
      break;
  }
};

Player.prototype.move = function (deltaX, deltaY) {
  if(this.canMove(deltaX, deltaY)) {
    this.x += deltaX;
    this.y += deltaY;
  }
  if(this.y == 0) this.reset();
}
Player.prototype.canMove = function (deltaX, deltaY) {
  if(this.x + deltaX < 0 || this.x + deltaX > gameWidth - tileWidth) return;
  if(this.y + deltaY < 0 || this.y + deltaY > gameHeight - tileHeight) return;
  return true;
}

Player.prototype.reset = function() {
  this.x = this.initialX;
  this.y = this.initialY;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemiesInitialPos = [
  {
    x: -tileWidth,
    y: tileHeight * 2 - 25,
    speed: 60
  },
  {
    x: -tileWidth,
    y: tileHeight * 3 - 25,
    speed: 100
  }
];
var allEnemies = [];
var player = new Player(2 * tileWidth, 4 * tileHeight);

enemiesInitialPos.forEach(function(enemy){
  var enemy = new Enemy(enemy.x, enemy.y, enemy.speed);
  allEnemies.push(enemy);
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
