'use strict';

function Enemy (canvas, y, speed) {
    var self = this;

    self.canvas = canvas;
    self.size = 50;
    self.x = canvas.width + self.size;
    self.y = y;
    self.speed = speed;
    self.ctx = self.canvas.getContext('2d');
}

Enemy.prototype.update = function () {
    var self = this;

    self.x = self.x -self.speed;
};

Enemy.prototype.draw = function () {
    var self = this;

    self.ctx.fillStyle = 'pink';
    self.ctx.fillRect(self.x - (self.size/2), self.y- (self.size/2), self.size, self.size);

};

Enemy.prototype.isInScreen = function () {
    var self = this;
    //  if x is smaller than 0 remove from the arry
    return self.x + self.size / 2 > 0;
}

