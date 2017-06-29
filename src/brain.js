"use strict";

export {Brain};


function Brain(neurons = 40) {

    let defs = [];
    defs.push({type: 'input', out_sx: 1, out_sy: 1, out_depth: 4});
    defs.push({type: 'fc', num_neurons: neurons, activation: 'relu'});
    defs.push({type: 'fc', num_neurons: neurons, activation: 'relu'});
    defs.push({type: 'fc', num_neurons: neurons, activation: 'relu'});
    defs.push({type: 'fc', num_neurons: neurons, activation: 'relu'});
    defs.push({type: 'fc', num_neurons: neurons, activation: 'relu'});
    defs.push({type: 'regression', num_neurons: 2});

    let options = {learning_rate: 0.001, l2_decay: 0.001};


    this.net = new convnetjs.Net();
    this.net.makeLayers(defs);
    this.loss = 100;
    this.trainer = new convnetjs.SGDTrainer(this.net, options);
}

function reward(state, action) {
    let x = new convnetjs.Vol(state);
    let stats = this.trainer.train(x, action);
    this.loss = stats.loss;
}

function decide(state) {
    let x = new convnetjs.Vol(state);
    let result = this.net.forward(x);
    return [getSign(result.w[0]), getSign(result.w[1])];
}

const THRESHOLD= 0.1;
function getSign(d) {
    if (Math.abs(d)<THRESHOLD) return 0;
    return Math.sign(d);
}

Brain.prototype = {
    reward,
    decide
}
