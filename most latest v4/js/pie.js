

function lineChart(c, svg) {
    plotss(c, svg);
}

function getDataset(l, v) {
    return {
        label: l,
        count: v
    }
}

function plotss(text, svgg) {

    document.getElementById("loader").style.display="none";

    if (svgg != null)
        svgg.remove();
    console.log("start pie chart");
    var iterator = 0; // for iterating the loop
    var a_labels = new Array();
    var c_array = new Array();
    var adder = 0; // the indices of a_labels array
    var c_adder = 0; //the indices of c_addr array
    var data = { 'x': "", 'y': 0 };
    console.log("I am in before settimeout");
    

    d3.text(text, function(text) {
        var data = d3.csvParseRows(text).map(function(row) {
            return row.map(function(value) {
                if (iterator > 1 && iterator % 2 == 0) {
                    console.log(value);
                    a_labels[adder] = value;
                    adder++;
                } else if (iterator > 1 && iterator % 2 != 0) {
                    console.log(value);
                    c_array[c_adder] = parseInt(value);
                    c_adder++;
                }
                iterator++;
            });

        });

        //console.log(data);
        console.log("total data");
        console.log(a_labels);
        console.log(c_array);



        var obj = [];
        for (b = 0; b < c_array.length; b++) {
            //datas[b].x=a_labels[b];
            // datas[b].y=c_array[b];
            //console.log(counts[b]);
            //obj.push(getDataset(a_labels,(c_array))); 
            obj.push(getDataset(a_labels[b], c_array[b]));
        };

        /* for(b=0; b<c_array.length; b++){
            if(b>0 && b!=a_labels.length/2 && b!=a_labels.length-1)
            {
                a_labels[b]="";
            }
               
        }; */
        //console.log(datas);
        //console.log(counts[0]);
        console.log("obj ");
        console.log(obj);
        var bar = document.getElementById("barChart");
        var line = document.getElementById("myChart");
        var pies = document.getElementById("chart");

        if (pies.style.display === "none")
            pies.style.display = "block";

        if (line.style.display === "block")
            line.style.display = "none";

        if (bar.style.display === "block")
            bar.style.display = "none";
        //d3line(obj);
        var value = '#ffe066';
        //var ctx = document.getElementById("pieChart").getContext('2d');
        //ctx.clearRect(0,0,1000,601);

        //if(pies.style.minHeight=="100px")
        {
            console.log("calling pie for first time");
            if (pies.style.display === "none")
                pies.style.display = "block";
            // define data

            var dataset = obj;


            // chart dimensions
            var width = 700;
            var height = 500;

            // a circle chart needs a radius
            var radius = Math.min(width, height) / 2.5;
            console.log("radius " + radius);
            // legend dimensions
            var legendRectSize = 10; // defines the size of the colored squares in legend
            var legendSpacing = 40; // defines spacing between squares

            // define color scale
            //var color = d3.scaleOrdinal(d3.schemeCategory20c);
            var color = d3.scale.ordinal().range(["#bdc9c0","#fa8a0a","#dfe8e1","#ffba3b","#e8e5df","#ffc65c","#f7f3eb","#facc75"]);
            // more color scales: https://bl.ocks.org/pstuffa/3393ff2711a53975040077b7453781a9
            //d3.select("svg").remove();
            console.log("color is :" +color);
            d3.select("#chart").html("");
            //d3.select("#chart").remove();
            //d3.select("body").append('div').attr("id","#chart").attr("display","block").attr("class","blur");
            //d3.select("#chart").attr('class','blur');

            var svg = d3.select('#chart') // select element in the DOM with id 'chart'
                .append('svg').attr('filter', 'url(#f3)') // append an svg element to the element we've selected

            .attr('width', width) // set the width of the svg element we just added
                .attr('height', height) // set the height of the svg element we just added
                .append('g') // append 'g' element to the svg element
                .attr('transform', 'translate(' + ((width / 2) + 150) + ',' + (height / 2) + ')'); // our reference is now to the 'g' element. centerting the 'g' element to the svg element

            //d3.select("svg").attr("class","c");


            var arc = d3.arc()
                .innerRadius(0) // none for pie chart
                .outerRadius(radius); // size of overall chart

            var pie = d3.pie() // start and end angles of the segments
                .value(function(d) { return d.count; }) // how to extract the numerical data from each entry in our dataset
                .sort(null); // by default, data sorts in oescending value. this will mess with our animation so we set it to null

            // define tooltipf
            
            var tooltip = d3.select('#chart') // select element in the DOM with id 'chart'
                .append('div') // append a div element to the element we've selected                                    
                .attr('class', 'tooltip'); // add class 'tooltip' on the divs we just selected

            tooltip.append('text') // add divs to the tooltip defined above                            
                .attr('class', 'label'); // add class 'label' on the selection                         

            tooltip.append('div') // add divs to the tooltip defined above                     
                .attr('class', 'count'); // add class 'count' on the selection                  

            tooltip.append('div') // add divs to the tooltip defined above  
                .attr('class', 'percent'); // add class 'percent' on the selection

            // Confused? see below:

            // <div id="chart">
            //   <div class="tooltip">
            //     <div class="label">
            //     </div>
            //     <div class="count">
            //     </div>
            //     <div class="percent">
            //     </div>
            //   </div>
            // </div>

            dataset.forEach(function(d) {
                d.count = +d.count; // calculate count as we iterate through the data
                d.enabled = true; // add enabled property to track which entries are checked
            });

            // creating the chart
            var path = svg.selectAll('path') // select all path elements inside the svg. specifically the 'g' element. they don't exist yet but they will be created below
                .data(pie(dataset)) //associate dataset wit he path elements we're about to create. must pass through the pie function. it magically knows how to extract values and bakes it into the pie
                .enter() //creates placeholder nodes for each of the values
                .append('path') // replace placeholders with path elements
                .attr('d', arc) // define d attribute with arc function above
                .attr('fill', function(d) { return color(d.data.label); }) // use color scale to define fill of each label in dataset
                .each(function(d) { this._current - d; }); // creates a smooth animation for each track

            // mouse event handlers are attached to path so they need to come after its definition
            path.on('mouseenter', function(d) { // when mouse enters div   
                console.log("i am in");   
                
                var percent = Math.round(1000 * d.data.count ) / 10; // calculate percent
                tooltip.select('.label').html(d.data.label); // set current label           
                tooltip.select('.count').html('$' + d.data.count); // set current count            
                tooltip.select('.percent').html(percent + '%'); // set percent calculated above   
                tooltip.style('background','black');
                tooltip.style('display', 'block'); // set display                     
            });

            path.on('mouseleave', function() { // when mouse leaves div                        
                tooltip.style('display', 'none'); // hide tooltip for that element
            });

            path.on('mousemove', function(d) { // when mouse moves                  
                tooltip.style('top', (d3.event.layerY + 10) + 'px') // always 10px below the cursor
                    .style('left', (d3.event.layerX + 10) + 'px'); // always 10px to the right of the mouse
            });

            
           
         
            
            svg
  .selectAll('mySlices')
  .data(pie(dataset))
  .enter()
  .append('text')
  .text(function(d){ return  d.data.count})
  .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")";  })
  .style("text-anchor", "middle")
  .style("font-size", 17)

          
            // define legend
            var legend = svg.selectAll('.legend') // selecting elements with class 'legend'
                .data(color.domain()) // refers to an array of labels from our dataset
                .enter() // creates placeholder
                .append('g') // replace placeholders with g elements
                .attr('class', 'legend') // each g is given a legend class
                .attr('transform', function(d, i) {
                    var height = legendRectSize + legendSpacing; // height of element is the height of the colored square plus the spacing      
                    var offset = height * color.domain().length / 2; // vertical offset of the entire legend = height of a single element & half the total number of elements  
                    var horz = 15 * legendRectSize; // the legend is shifted to the left to make room for the text
                    var vert = i * height - offset; // the top of the element is hifted up or down from the center using the offset defiend earlier and the index of the current element 'i'               
                    return 'translate(' + -500 + ',' + vert + ')'; //return translation       
                });

                //legend.append('rect').style("background","black").attr("width","100px");
                legend.append('rect') // append rectangle squares to legend                                   
                .attr('width', legendRectSize+210) // width of rect size is defined above                        
                .attr('height', legendRectSize+40) // height of rect size is defined above                      
                .style('fill', "black")// each fill is passed a color
                .style('stroke', color).style('opacity',0.3);// each stroke is passed a color

            // adding colored squares to legend
            legend.append('rect') // append rectangle squares to legend                                   
                .attr('width', legendRectSize) // width of rect size is defined above                        
                .attr('height', legendRectSize) // height of rect size is defined above                      
                .style('fill', color)// each fill is passed a color
                .style('stroke', color).attr('x','20px').attr('y','20px')// each stroke is passed a color
                .on('click', function(label) {
                    var rect = d3.select(this); // this refers to the colored squared just clicked
                    var enabled = true; // set enabled true to default
                    var totalEnabled = d3.sum(dataset.map(function(d) { // can't disable all options
                        return (d.enabled) ? 1 : 0; // return 1 for each enabled entry. and summing it up
                    }));

                    if (rect.attr('class') === 'disabled') { // if class is disabled
                        rect.attr('class', ''); // remove class disabled
                    } else { // else
                        if (totalEnabled < 2) return; // if less than two labels are flagged, exit
                        rect.attr('class', 'disabled'); // otherwise flag the square disabled
                        enabled = false; // set enabled to false
                    }

                    pie.value(function(d) {
                        if (d.label === label) d.enabled = enabled; // if entry label matches legend label
                        return (d.enabled) ? d.count : 0; // update enabled property and return count or 0 based on the entry's status
                    });

                    path = path.data(pie(dataset)); // update pie with new data

                    path.transition() // transition of redrawn pie
                        .duration(750) // 
                        .attrTween('d', function(d) { // 'd' specifies the d attribute that we'll be animating
                            var interpolate = d3.interpolate(this._current, d); // this = current path element
                            this._current = interpolate(100); // interpolate between current value and the new value of 'd'
                            return function(t) {
                                return arc(interpolate(t));
                            };
                        });
                }).attr('transform', 'rotate('+ 0 + ',' + 100 +')');

               
            // adding text to legend
            legend.append('text')
                .attr('x', legendRectSize + legendSpacing)
                .attr('y', legendRectSize - legendSpacing +60)
                .text(function(d) { return d; }); // return label


                



            /* document.querySelector('.legend').innerHTML = myChart.generateLegend();

            var legendItems = document.querySelector('.legend').getElementsByTagName('li');
            for (var i = 0; i < legendItems.length; i++) {
              legendItems[i].addEventListener("click", legendClickCallback.bind(this,i), false);
              legendItems[i].style.color=orange(i);
              legendItems[i].style.fontColor
            }

            function legendClickCallback(legendItemIndex){
              document.querySelectorAll('.myChart').forEach((chartItem,index)=>{
                var chart = Chart.instances[index];
                var dataItem = chart.data.datasets[legendItemIndex]    
                if(dataItem.hidden == true || dataItem.hidden == null){
                  dataItem.hidden = false;
                } else {
                  dataItem.hidden = true;
                }
                chart.update();
              })  
            } */


            /* var myLegendContainer = document.getElementById("legend");
            // generate HTML legend
            //myLegendContainer.innerHTML = myChart.generateLegend();
            // bind onClick event to all LI-tags of the legend
            //var legendItems = myLegendContainer.getElementsByTagName('li');
            var legendItems = myLegendContainer.getElementsByTagName('li');
            for (var i = 0; i < legendItems.length; i += 1) {
              //legendItems[i].append('<div class="legendValue"><span style="background-color:' + orange(i) + '">&nbsp;&nbsp;&nbsp;&nbsp;</span>');
              legendItems[i].addEventListener("click", legendClickCallback, false);
              //egendItems.a
              legendItems[i].style.listStyleType= "square";
              //legendItems[i].className="check";
              //legendItems[i].style.fontSize="150%";
              legendItems[i].style.color=orange(i);
              legendItems[i].style.fill=orange(i);
              legendItems[i].style.x="110";
              legendItems[i].style.y="110";
              legendItems[i].style.width="200px";
              legendItems[i].style.height="200px";
              //legendItems[i].style.border="1px solid #000";
                
            }

            function legendClickCallback(event) {
              event = event || window.event;

              var target = event.target || event.srcElement;
              while (target.nodeName !== 'LI') {
                target = target.parentElement;
              }
              var parent = target.parentElement;
              var chartId = parseInt(parent.classList[0].split("-")[0], 10);
              var chart = Chart.instances[chartId];
              var index = Array.prototype.slice.call(parent.children).indexOf(target);
              var meta = chart.getDatasetMeta(0);
              console.log(index);
            	var item = meta.data[index];

              if (item.hidden === null || item.hidden === false) {
                item.hidden = true;
                //target.classList.add('hidden');
              } else {
                //target.classList.remove('hidden');
                item.hidden = null;
              }
              chart.update();
            } */



            return svg;




            pies.style.minHeight = "101px";
        }



    });

    //const lifeExp = 'Average # of Expenses/Report per Day';
    //let dataAsJson = JSC.csv2Json(text);


    //	console.log("rating ");
    //	console.log(counts);

}


var values = 0;
var set = false;
var val = "";
//var colors=['#0084ff','#69b4fa','#96cafa','#b6dbfc','#cfe7fc','#ff9705','#ffab36','#ffbd61','#ffcc85','#ffd9a3','#fc4b05','#f75d2a','#ff8259','#ffa182','#e69a81']
var colors = d3.schemeCategory20;

function orangeColors() {
    /* dec=parseInt(Number(value), 10);
    console.log("dec "+dec);
    dec=dec+1000;
    value=''+parseInt(dec, 16);
    console.log("value  "+ value); */
    console.log('d3.schemeCategory20 ==> ', d3.schemeCategory20);

    values++;
    console.log("values " + colors[values - 1]);
    val = colors[values - 1];
    console.log("val " + val);
    return colors[values - 1];
}

function orange(b) {
    /* dec=parseInt(Number(value), 10);
    console.log("dec "+dec);
    dec=dec+1000;
    value=''+parseInt(dec, 16);
    console.log("value  "+ value); */
    //console.log('d3.schemeCategory20 ==> ', d3.schemeCategory20);

    //  values++;
    //console.log("values "+colors[values-1]);
    //val=colors[values-1];
    //console.log("val "+val);
    return colors[b];
}

function colors() {
    const red = 255;
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);
    return `rgba(${red}, ${green}, ${blue})`;
}

var h = 0;
var s = 2;
var v = 0;

function HSVtoRGB() {

    var r, g, b, i, f, p, q, t;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0:
            r = v, g = t, b = p;
            break;
        case 1:
            r = q, g = v, b = p;
            break;
        case 2:
            r = p, g = v, b = t;
            break;
        case 3:
            r = p, g = q, b = v;
            break;
        case 4:
            r = t, g = p, b = v;
            break;
        case 5:
            r = v, g = p, b = q;
            break;
    }
    s = s + 2;
    if (s == 10) {
        h = h + 1;
        s = 0;
    }
    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);
    var d3 = d3.scaleOrdinal(d3.schemeCategory20);
    val = `rgba(${r}, ${g}, ${b})`;
    console.log("d3 " + d3);
    //console.log("val "+val);
    return `rgba(${r}, ${g}, ${b})`;

}

function generateColors() {
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);
    return `rgba(${red}, ${green}, ${blue})`;
}