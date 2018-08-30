'use strict';

function Player (canvas, lives) {
    var self = this;

    self.canvas = canvas;
    self.lives = lives;
    self.size = 50;
    self.x = 10 + (self.size / 2);
    self.y = canvas.height / 2;
    self.direction = 0;
    self.speed = 5;
    self.ctx = self.canvas.getContext('2d');
}

Player.prototype.setDirection = function (direction) {
    var self = this;

    self.direction = direction;
};

Player.prototype.collidesWithEnemy = function (enemy) {
    var self = this;
    
    const collidesRight = self.x + self.size / 2 > enemy.x - enemy.size / 2;
    const collidesLeft = self.x - self.size / 2 < enemy.x + enemy.size / 2;
    const collidesTop = self.y - self.size / 2 < enemy.y + enemy.size / 2;
    const collidesBottom = self.y + self.size / 2 > enemy.y - enemy.size / 2;

    if (collidesLeft && collidesRight && collidesTop && collidesBottom) {
        return true;
    }
    
    return false;
};

Player.prototype.collided = function (enemy) {
    var self = this;
    
    self.lives--;
};


Player.prototype.update = function () {
    var self = this;

    self.y = self.y + self.direction * self.speed;

    if (self.y < 0) {
        self.direction = 1;
    }

    if (self.y > self.canvas.height) {
        self.direction = -1;
    }
};

Player.prototype.draw = function () {
    var self = this;

    

    self.ctx.fillStyle = '#FEF246';
    self.ctx.fillRect(self.x - (self.size/2), self.y- (self.size/2), self.size, self.size);

};
