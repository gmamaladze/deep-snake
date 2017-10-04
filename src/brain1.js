"use strict";

export {Brain1};

function Brain1(neurons = 40) {

    let defs = [];
    defs.push({type: 'input', out_sx: 1, out_sy: 1, out_depth: 4});
    defs.push({type: 'fc', num_neurons: neurons, activation: 'relu'});
    defs.push({type: 'fc', num_neurons: neurons, activation: 'relu'});
    defs.push({type: 'fc', num_neurons: neurons, activation: 'relu'});
    defs.push({type: 'fc', num_neurons: neurons, activation: 'relu'});
    defs.push({type: 'fc', num_neurons: neurons, activation: 'relu'});
    defs.push({type: 'regression', num_neurons: 2});

    this.net = new convnetjs.Net();
    this.net.makeLayers(defs);
    this.trainer = new convnetjs.Trainer(this.net, {method: 'sgd', learning_rate: 0.001, l2_decay: 0.001, batch_size: 1});

    this.epsilon = 1;
    this.loss = 1;
}

const depsilon = 0.0001;
function reward(state, action) {
    this.epsilon -=depsilon;
    let x = new convnetjs.Vol(state);
    let stats = this.trainer.train(x, action);
    this.loss = stats.loss ? stats.loss  : 1 ;
}

function decide(state) {
    this.epsilon +=depsilon*0.5;
    let chance = Math.random();
    return (chance < this.epsilon ) ? random() : this.conscious(state);
}

function conscious(state) {
    let x = new convnetjs.Vol(state);
    let result = this.net.forward(x);
    return [getSign(result.w[0]), getSign(result.w[1])];
}

const THRESHOLD= 0.1;
function getSign(d) {
    if (Math.abs(d)<THRESHOLD) return 0;
    return Math.sign(d);
}

function random() {
    return [getRandomSign(), getRandomSign()];
}

function getRandomSign() {
    return Math.sign(Math.floor(Math.random() * 3)-1);
}

function cloneFrom(other) {
    let json = other.net.toJSON();
    this.net.fromJSON(json);
}

Brain1.prototype = {
    reward,
    decide,
    conscious,
    cloneFrom
}
