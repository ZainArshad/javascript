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
            borderColor: data.map(e=>generateColors()), // Add custom color border (Line)
            backgroundColor: data.map(e=>generateColors()), // Add custom color background (Points and Fill)
            borderWidth: 1 
    }]},
    options: {
		title: {
			display: true,
			
            text: 'Average # of Expenses/Report per Day'
		},
		legend: {
			display: true,
			position:'right',
        },
      responsive: false, // Instruct chart js to respond nicely.
      maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
    }
});

pie.style.minHeight="101px";
   }



});

	//const lifeExp = 'Average # of Expenses/Report per Day';
	//let dataAsJson = JSC.csv2Json(text);
	
	
//	console.log("rating ");
//	console.log(counts);
	
}

function generateColors(){
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);
    return `rgba(${red}, ${green}, ${blue})`;
  }