'use strict';
import {DIRECTIONS} from "./directions.js";
import {Point} from "./point.js";

export {Snake};

function Snake(position = new Point()) {
    this.body = [position];
    this.length = this.initLength;
    this.isAlive = true;
    this.score = 0;

    let direction = DIRECTIONS.getRandom();
    while (this.length < this.body.length) {
        this.move(direction);
    }
    return this;
}

function head() {
    return this.body[0];
}

function move(direction) {
    let head = this.body[0].add(direction);
    this.body.unshift(head);
    return this;
}
function grow() {
    this.score++;
    if (this.length<this.maxLength) this.length++;
    return this;
}

function eat(food) {
    food.kill();
    return this.grow();
}

function trim() {
    while (this.body.length > this.length) {
        this.body.pop();
    }
    return this;
}

function kill() {
    this.isAlive = false;
}

function getCells() {
    let being = this;
    return this.body.map(function (point) {
        return {point, being}
    });
}

Snake.prototype = {
    head,
    move,
    eat,
    grow,
    trim,
    kill,
    getCells,
    initLength: 3,
    maxLength: 3,
    kind: "snake"
};
