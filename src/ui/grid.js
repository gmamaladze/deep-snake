'use strict';

export {Grid};

function Grid(element = 'body', pixel = 12, size = {x: 20, y: 20}) {
    /* global d3:true */
    this._color = {snake: "silver", food: "green"};
    let grid = this;
    this.svg = d3.select(element)
        .append('svg')
        .attr('width', size.x * pixel)
        .attr('height', size.y * pixel)
        .on("mousemove", () => {grid.hasFocus = true;})
        .on("mouseout", () => {grid.hasFocus = false;});
    this.pixel = pixel;
}

function draw(cells) {
    var blocks = this.svg
        .selectAll("rect")
        .data(cells, d => d.point.getHash() << 8 + encodeKind(d.being.kind) );

    blocks.enter()
        .append('rect')
            .attr('width', this.pixel)
            .attr('height', this.pixel)
            .attr('x', d => d.point.x * this.pixel)
            .attr('y', d => d.point.y * this.pixel)
            .style('fill', d => this._color[d.being.kind])
        .merge(blocks)
            .attr('class', d => d.being.kind);

    blocks.exit().remove();
}

const SNAKE_CODE = 1;
const FOOD_CODE = 2;
const UNKNOWN_CODE = 255;


function encodeKind(kind) {
    if (kind==="snake") return SNAKE_CODE;
    if (kind==="food") return FOOD_CODE;
    return UNKNOWN_CODE;
}


function color(snake, food) {
    if (snake) this._color['snake'] = snake;
    if (food) this._color['food'] = food;
    return this;
};


Grid.prototype = {
    draw,
    color
}
