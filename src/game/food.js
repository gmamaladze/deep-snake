'use strict';
import {Point} from "./point.js";

export {Food};

function Food(position = new Point()) {
    this.body = [position];
    this.isAlive = true;
    this.age = 0;
}


function head() {
    return this.body[0];
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

Food.prototype = {
    head,
    kill,
    getCells,
    kind : "food"
};
