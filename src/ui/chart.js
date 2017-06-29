'use strict';
/* global d3:true */

export {Chart};

function Chart(parent ="body", label = "", size = [300, 200] , xcount = 20, ymax = 100) {

  this.data = [];

  var _color = "steelblue";
  var tickCount = 0;

  var svg = d3.select(parent)
    .append("svg")
    .attr("width", size[0])
    .attr("height", size[1]);

  var margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 50
  };

  var width = +svg.attr("width") - margin.left - margin.right;
  var height = +svg.attr("height") - margin.top - margin.bottom;
  var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//scale x and y values
  var x = d3.scaleLinear()
      .domain([0, ymax])
      .rangeRound([0, width]);

  var y = d3.scaleLinear()
    .rangeRound([height, 0]);

  //function to generate svg path from values
  var area = d3.area()
    .x(function(d) {
      return x(d.ticks);
    })
    .y1(function(d) {
      return y(d.value);
    });

    y.domain([0, ymax]);

    //Add y axes label
    g.append("g")
      .attr("class", "yaxes")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text(label);


  //call this function to add one more value
  this.push = function(value) {
    this.data.push({
      ticks: tickCount++,
      value: Math.max(0, Math.min(ymax, value)) ,
    });

    if (this.data.length > xcount+1) {
      this.data.shift();
    }

    var xmin = d3.min(this.data, d => d.ticks);
    var xmax = xmin + xcount;
    x.domain([xmin, xmax]);


    area.y0(y(0));

    g.selectAll(".replace").remove();

    g.append("path")
      .attr("class", "replace")
      .datum(this.data)
      .attr("fill", _color)
      .attr("d", area);


      g.append("g")
        .attr("class", "replace")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickValues([xmin, xmax]));
  };

  this.avg = function() {
      return this.data.reduce( (sum, cur) => sum + cur.value, 0) / this.data.length;
  }

  this.color = function color(value) {
    _color = value;
  };
}
