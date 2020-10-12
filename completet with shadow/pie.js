function lineChart(c)
    {
        plotss(c);
    }

function plotss(text)
{
 
    console.log("start pie chart");
    var iterator=0;// for iterating the loop
    var a_labels= new Array();
    var c_array=new Array();
    var adder=0;// the indices of a_labels array
    var c_adder=0;//the indices of c_addr array
    var data ={'x':"",'y':0};
   
    d3.text(text, function(text) {
  var data = d3.csvParseRows(text).map(function(row) {
    return row.map(function(value) {
        if(iterator>1 && iterator%2==0) 
        {
            console.log(value);
            a_labels[adder]=value;
            adder++;
        }
        else if(iterator>1 && iterator%2!=0) 
        {
            console.log(value);
            c_array[c_adder]=parseInt(value);
            c_adder++;
        }
      iterator++;
    });
    
  });
 
  //console.log(data);
  console.log("total data");
  console.log(a_labels);
  console.log(c_array);



  var obj=[];
	for(b=0; b<c_array.length; b++){
        //datas[b].x=a_labels[b];
        // datas[b].y=c_array[b];
		//console.log(counts[b]);
        //obj.push(getDataset(a_labels,(c_array))); 
        obj.push(getDataset(a_labels[b],c_array[b]));
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
var bar=document.getElementById("barChart");
    var line=document.getElementById("myChart");
    var pie=document.getElementById("pieChart");

    if(pie.style.display==="none")
     pie.style.display="block";

    if(line.style.display==="block")
     line.style.display="none";

     if(bar.style.display==="block")
     bar.style.display="none";
//d3line(obj);
    var value='#ffe066';
	var ctx = document.getElementById("pieChart").getContext('2d');
    //ctx.clearRect(0,0,1000,601);
    
    if(pie.style.minHeight=="100px")
   {
     console.log("calling pie for first time");
     if(pie.style.display==="none")
     pie.style.display="block";
	var myChart = new Chart(ctx, {
    type: 'pie',
    
    //data: obj,
    data: {
        labels: a_labels,
        datasets:[ 
            {
                data:c_array,
        fill: false,
           
            backgroundColor:  data.map(e=> orangeColors()), // Add custom color background (Points and Fill)
            //borderColor: data.map(e=> orangeColors()), // Add custom color border (Line)
            borderWidth: 0
    }]},
    options: {
        layout: {
            padding: {
                left: 0,
                right: 61,
                top:0,
                bottom: 0
            }
          },
		title: {
			display: true,
			
            text: 'Average # of Expenses/Report per Day'
		},
		legend: {
			display: false,
			position:'right',
        },
      responsive: false, // Instruct chart js to respond nicely.
      maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
    }
});

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


var myLegendContainer = document.getElementById("legend");
// generate HTML legend
myLegendContainer.innerHTML = myChart.generateLegend();
// bind onClick event to all LI-tags of the legend
var legendItems = myLegendContainer.getElementsByTagName('li');
for (var i = 0; i < legendItems.length; i += 1) {
  legendItems[i].addEventListener("click", legendClickCallback, false);
  legendItems[i].style.color=orange(i);
  legendItems[i].style.width="20px";
  legendItems[i].style.height="20px";
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
}


pie.style.minHeight="101px";
   }



});

	//const lifeExp = 'Average # of Expenses/Report per Day';
	//let dataAsJson = JSC.csv2Json(text);
	
	
//	console.log("rating ");
//	console.log(counts);
	
}
  var values=0;
    var set=false;
    var val="";
  //var colors=['#0084ff','#69b4fa','#96cafa','#b6dbfc','#cfe7fc','#ff9705','#ffab36','#ffbd61','#ffcc85','#ffd9a3','#fc4b05','#f75d2a','#ff8259','#ffa182','#e69a81']
    var colors= d3.schemeCategory20;
function orangeColors(){
    /* dec=parseInt(Number(value), 10);
    console.log("dec "+dec);
    dec=dec+1000;
    value=''+parseInt(dec, 16);
    console.log("value  "+ value); */
    console.log('d3.schemeCategory20 ==> ', d3.schemeCategory20);

      values++;
    console.log("values "+colors[values-1]);
    val=colors[values-1];
    console.log("val "+val);
    return colors[values-1];
  }

  function orange(b){
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

  function colors()
  {
    const red = 255;
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);
    return `rgba(${red}, ${green}, ${blue})`;   
  }

  var h=0;
  var s=2;
  var v=0;

  function HSVtoRGB() {
    
    var r, g, b, i, f, p, q, t;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    s=s+2;
    if(s==10)
    {
        h=h+1;
        s=0;
    }
        r= Math.round(r * 255);
        g= Math.round(g * 255);
        b= Math.round(b * 255);
        var d3=d3.scaleOrdinal(d3.schemeCategory20);
        val= `rgba(${r}, ${g}, ${b})`;
        console.log("d3 "+d3);
        //console.log("val "+val);
        return `rgba(${r}, ${g}, ${b})`; 

}

  function generateColors(){
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);
    return `rgba(${red}, ${green}, ${blue})`;
  }