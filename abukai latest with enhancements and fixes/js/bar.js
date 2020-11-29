function barChart(c)
    {
       
        bplotss(c);
    }

function bplotss(text)
{
  document.getElementById("loader").style.display="none";

    console.log("start bar chart");
    var iterator=0;// for iterating the loop
    var a_labels= new Array();
    var c_array=new Array();
    var adder=0;// the indices of a_labels array
    var c_adder=0;//the indices of c_addr array
    var data ={'x':"",'y':0};
    var chart=document.getElementById('myChart');
    
   
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
  c_array.reverse();
  a_labels.reverse();


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
//d3line(obj);

    var bar=document.getElementById("barChart");
    var line=document.getElementById("myChart");
    var pie=document.getElementById("chart");
    var ctx = document.getElementById("barChart").getContext('2d');
    
    //ctx.clearRect(0,0,1000,601);

    if(line.style.display==="block")
     line.style.display="none";

     if(pie.style.display==="block")
     pie.style.display="none";
    
     if(bar.style.display==="none")
     bar.style.display="block";
    //var line=document.getElementById("myChart");
    //var pie=document.getElementById("pieChart");

   // if(ctx.style.display==="none")
   // {
   //     console.log("in block");
   //     bar.style.display="block";
   // }

   if(bar.style.minHeight=="100px")
   {
     console.log("calling bar for first time");
     if(bar.style.display==="none")
     bar.style.display="block";
	var myChart = new Chart(ctx, {
    type: 'bar',
    
    //data: obj,
    data: {
        labels: a_labels,
        datasets:[ 
            {
                data:c_array,
        fill: false,
            borderColor: '#eb9834', // Add custom color border (Line)
            backgroundColor: '#eb9834', // Add custom color background (Points and Fill)
            borderWidth: 1 
    }]},
    options: {
      layout: {
        padding: {
            left: 0,
            right:491,
            top:0,
            bottom: 0
        }
      },     
		title: {
			display: true,
			
            text: 'Spend per Category'
    },
		legend: {
			display: false,
			position:'right',
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false,
              color: "black"
            },
           
          }],
          yAxes: [{
            gridLines: {
              drawBorder: false,
              color: "black",
              borderDash: [2, 5],
            },
           
          }]
        },
      responsive: false, // Instruct chart js to respond nicely.
      maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
    },
    
});

bar.style.minHeight="101px";

    }

});

if(bar.style.display==="none")
{
  bar.style.display="block";
}
    

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