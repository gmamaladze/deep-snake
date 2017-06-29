'use strict';

import {
    Snake
} from "./snake.js";

import {
    Food
} from "./food.js";

export {
    Universe
};

function Universe(snk = new Snake(), fd = new Food()) {
    this.snake = snk;
    this.food = fd;
}

function tick(direction) {
    this.snake.move(direction);
    let head = this.snake.head()
    var others = this.getAt(head);
    others.forEach(other => this.snake.eat(other));
    this.snake.trim();
    this.food.age++;
    if (this.food.age>100) this.food.kill();
    if (!this.food.isAlive) this.food = new Food();
    return this.getCells();
}


function getCells() {
    return [this.snake.getCells(), this.food.getCells()].reduce((acc, cur) => acc.concat(cur), [])
}

function getAt(point) {
    return point.equals(this.food.head()) ? [this.food] : []  ;
}

Universe.prototype = {
    tick,
    getCells,
    getAt
}