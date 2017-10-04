"use strict";

export {Brain2};


function Brain2(size = {x:20, y:20}) {

    this.frameCount = 2;
    let outputSize = size.x * size.y;
    let inputSize = outputSize * this.frameCount;

    let defs = [];
    this.size = size;
    defs.push({type:'input', out_sx:size.x, out_sy:size.y, out_depth: 2});
    defs.push({type: 'fc', num_neurons: 1000, activation:'relu'});
    defs.push({type: 'fc', num_neurons: 1000, activation:'relu'});
    //defs.push({type: 'fc', num_neurons: outputSize / 4, activation:'relu'});
    //defs.push({type: 'fc', num_neurons: 100, activation:'relu'});
    defs.push({type: 'svm', num_classes: outputSize});


    this.net = new convnetjs.Net();
    this.net.makeLayers(defs);
    this.loss = 1;
    this.trainer = new convnetjs.Trainer(this.net, {method: 'sgd', l1_decay: 0.0001, l2_decay: 0.00001, learning_rate: 0.000001, batch_size: 10});

    this.frames = [];
}

function reward(point) {
    if (this.frames.length<this.frameCount) return;
    let inputs = flatten(this.frames);
    let x = new convnetjs.Vol(inputs);
    let answer = point[1] * this.size.x + point[0];
    let stats = this.trainer.train(x, [answer]);
    this.loss = stats.loss;
}

function decide(state) {
    this.frames.push(state);
    if (this.frames.length<this.frameCount) {return random()}
    while (this.frames.length>3) {this.frames.shift();}
    let inputs = flatten(this.frames);
    let v = new convnetjs.Vol(inputs);
    return this.net.forward(v).w;
}

function random() {
    return [Math.random() * 20, Math.random() * 20]
}

function flatten(states) {
    return states.reduce((a, b) => a.concat(b), []);
}

function cloneFrom(other) {
    let json = other.net.toJSON();
    this.net.fromJSON(json);
}

function indexOfMax(a) {
    return a.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
}

Brain2.prototype = {
    reward,
    decide,
    cloneFrom
}
