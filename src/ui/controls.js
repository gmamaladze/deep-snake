'use strict';

export {Controls};

function Controls() {

    const left = 37;
    const up = 38;
    const right = 39;
    const down = 40;


    let keyMap = {};
    keyMap[up] = [0, -1];
    keyMap[right] = [1, 0];
    keyMap[down] = [0, 1];
    keyMap[left] = [-1, 0];

    this.value = [1,0];
    let controls = this;

    document.addEventListener("keydown", function (e) {
        let input = keyMap[e.keyCode];
        if (!(input+1)) return;
        controls.value = input;
        e.preventDefault();
    });

}
