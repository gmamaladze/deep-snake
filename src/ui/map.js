'use strict';

export {Map};

function Map(element = 'body', pixel = 12, size = {x: 20, y: 20}) {
    this.color();
    /* global d3:true */
    this.svg = d3.select(element)
        .append('svg')
        .attr('width', size.x * pixel)
        .attr('height', size.y * pixel);
    this.pixel = pixel;
    this.size = size;
}


function draw(weights) {

    let data = [];

    let colorScale  = d3.scaleLinear()
        .domain([Math.min(...weights),Math.max(...weights)])
        //.domain([-3000,10000])
        .interpolate(d3.interpolateHcl)
        .range(["white", "green"]);

    console.log(Math.max(...weights));
    console.log(Math.min(...weights));

    weights.forEach(function(value, id) {
        data.push({
            value,
            id
        })
    });

    var blocks = this.svg
        .selectAll("rect")
        .data(data, d=> d.id);

    blocks.enter()
        .append('rect')
            .attr('width', this.pixel)
            .attr('height', this.pixel)
            .attr('x', d => (d.id % this.size.x)  * this.pixel )
            .attr('y', d => (Math.floor(d.id / this.size.x)) * this.pixel)
        .merge(blocks)
            .style('fill', d => colorScale(d.value) );

    blocks.exit().remove();
}

function drawFocus(point) {
    var focus  = this.svg
        .selectAll("circle")
        .data([point], d => d.getHash());

    focus.enter()
        .append('circle')
        .attr('r', this.pixel)
        .attr('cx', d => d.x * this.pixel)
        .attr('cy', d => d.y * this.pixel)
        .style('stroke', 'red')
        .style('fill', 'rgba(0,0,0,0)')
        .merge(focus);

    focus.exit().remove();
}

function color(low = "white", high = "green") {
    this._color  = d3.scaleLinear()
        .domain([-1,1])
        .interpolate(d3.interpolateHcl)
        .range([low, high]);
    return this;
};


Map.prototype = {
    draw,
    drawFocus,
    color
}

