'use strict';

import {
    Universe
} from "./universe.js";

import {
    Snake
} from "./snake.js";

import {
    Food
} from "./food.js";

import {
    Point
} from "./point.js";

import {
    DIRECTIONS
} from "./directions.js";

export {Game};

function Game(size = new Point(20, 20), universe =  new Universe()) {
    this.size = size;
    Point.prototype.size = size;
    this.universe = universe;
    this.directions = DIRECTIONS.getAll();
    this.dir2id = {};
    this.directions.forEach((point,index)=>this.dir2id[point.getHash()]=index);
}

function state() {
    let cells = this.universe.getCells();
    let output = new Array(this.size.x * this.size.y).fill(0);
    cells.forEach( cell => output[cell.point.x + this.size.y * cell.point.y] = encodeKind(cell.being))
    return output
}

function state2() {
    let f = this.universe.food.head();
    let s = this.universe.snake.head();
    return [f.x, f.y, s.x, s.y];
}

function tick(input, draw = () => {}) {
    let direction = new Point(input[0], input[1]);
        let cells = this.universe.tick(direction);
    draw(cells);
}

function score() {
    return this.universe.snake.score;
}

function hint() {
    var direction = DIRECTIONS.getFromTo(this.universe.snake.head(), this.universe.food.head());
    return [direction.x, direction.y];
}

const SNAKE_CODE = 1;
const FOOD_CODE = 2;
const UNKNOWN_CODE = 255;


function encodeKind(being) {
    if (Snake.prototype.isPrototypeOf(being)) return SNAKE_CODE;
    if (Food.prototype.isPrototypeOf(being)) return FOOD_CODE;
    return UNKNOWN_CODE;
}

Game.prototype = {
    tick,
    score,
    hint,
    state,
    state2
}