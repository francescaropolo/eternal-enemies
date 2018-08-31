'use strict';

function Live (canvas, y, speed) {
    var self = this;

    self.canvas = canvas;
    self.size = 20;
    self.x = canvas.width + self.size;
    self.y = y;
    self.speed = speed;
    self.ctx = self.canvas.getContext('2d');
}

Live.prototype.update = function () {
    var self = this;

    self.x = self.x -self.speed;
};

Live.prototype.draw = function () {
    var self = this;

    self.ctx.fillStyle = '#692e8c';
    self.ctx.fillRect(self.x - (self.size/2), self.y- (self.size/2), self.size, self.size);

};

Live.prototype.isInScreen = function () {
    var self = this;
    //  if x is smaller than 0 remove from the arry
    return self.x + self.size / 2 > 0;
}