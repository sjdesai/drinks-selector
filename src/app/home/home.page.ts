import { DrinkType } from './../../dto/DrinkType';
import { CreateNewWheelPage } from './../create-new-wheel/create-new-wheel.page';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as d3 from "d3";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  selectedDrink: string = '';

  constructor(private navCtrl: NavController) {}

  ngOnInit(){
    this.drawWheel();
  }

  data: DrinkType[] = [
          {'label':'Vodka Soda',  'prob': 1}, // padding
          {'label': "Rum and Coke",  'prob': 1}, // font-family
          {'label': "Vodka Energy Drink",  'prob': 1}, // color
          {'label':'Mojito',  'prob': 1}, // font-weight
          {'label': "Tequila Shot",  'prob': 1}, // font-size
          
  ];

  drawWheel(){
    var padding = {top: 20, right: 20, bottom: 0, left: 20};

    var w = 360 - padding.left - padding.right;
    var h = 550 - padding.top  - padding.bottom;
    var r = Math.min(w, h) / 2;
    var picked: number = 100000;
    // var oldpick = [];
    var rotation:number = 0;
    var oldrotation:number = 0;
    var color = d3.scaleOrdinal(d3.schemeCategory10); // category20c()

    var svg = d3.select('#chart')
            .append("svg")
            .data([this.data])
            .attr("width",  w + padding.left + padding.right)
            .attr("height", h + padding.top + padding.bottom);

        var container = svg.append("g")
            .attr("class", "chartholder")
            .attr("transform", "translate(" + (w/2 + padding.left) + "," + (h/2 + padding.top) + ")");

        var vis = container
            .append("g");
            
        var pie = d3.pie().value(function(d){return d.prob;}).sort(null);

        // declare an arc generator function
        var arc = d3.arc()
          .innerRadius(0)
          .outerRadius(r);

        // select paths, use arc generator to draw
        var arcs = vis.selectAll("g.slice")
            .data(pie)
            .enter()
            .append("g")
            .attr("class", "slice");
            

        arcs.append("path")
            .attr("fill", function(d, i){ return color(i); })
            .attr("d", function (d) { return arc(d); });

        // add the text
        var self = this;
        
        arcs.append("text").attr("transform", function(d){
                d.innerRadius = 0;
                d.outerRadius = r;
                d.angle = (d.startAngle + d.endAngle)/2;
                return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius -10) +")";
            })
            .attr("text-anchor", "end")
            .attr("fill", "white")
            .text( function(d, i) {
                return self.data[i].label;
            });
        
        container.on("click", spin);

        function spin(d){
            
              container.on("click", null);
              //all slices have been seen, all done
              // console.log("OldPick: " + oldpick.length, "Data length: " + self.data.length);
              // if(oldpick.length == self.data.length){
              //     console.log("done");
              //     container.on("click", null);
              //     return;
              // }
              var  ps       = 360/self.data.length,
                   pieslice = Math.round(1440/self.data.length),
                   rng      = Math.floor((Math.random() * 1440) + 360);
                  
              rotation = (Math.round(rng / ps) * ps);
              
              picked = Math.round(self.data.length - (rotation % 360)/ps);
              picked = picked >= self.data.length ? (picked % self.data.length) : picked;
              // if(oldpick.indexOf(picked) !== -1){
              //     d3.select(this).call(spin);
              //     return;
              // } else {
              //     oldpick.push(picked);
              // }
              rotation += 90 - Math.round(ps/2);
              vis.transition()
                  .duration(3000)
                  .attrTween("transform", rotTween)
                  .on("end", function(){
                      //mark question as seen
                      // d3.select(".slice:nth-child(" + (picked + 1) + ") path")
                      //     .attr("fill", "#111");
                      //populate question
                      self.selectedDrink=self.data[picked].label;
                      // d3.select("#question h1")
                      //     .text(self.data[picked].question);
                      oldrotation = rotation;
                  
                      container.on("click", spin);
                  });
          }
          //make arrow
          svg.append("g")
              .attr("transform", "translate(" + (w + padding.left + padding.right) + "," + ((h/2)+padding.top) + ")")
              .append("path")
              .attr("d", "M-" + (r*.25) + ",0L0," + (r*.05) + "L0,-" + (r*.05) + "Z")
              .style({"fill":"black"});
          //draw spin circle
          // container.append("circle")
          //     .attr("cx", 0)
          //     .attr("cy", 0)
          //     .attr("r", 60)
          //     .style({"fill":"white","cursor":"pointer"});
          //spin text
          // container.append("text")
          //     .attr("x", 0)
          //     .attr("y", 15)
          //     .attr("text-anchor", "middle")
          //     .text("SPIN")
          //     .style({"font-weight":"bold", "font-size":"30px"});
          
          
          function rotTween(to) {
            var i = d3.interpolate(oldrotation % 360, rotation);
            return function(t) {
              return "rotate(" + i(t) + ")";
            };
          }
        
  }

}
