function getDataset(index, data) { 
return { 
x: index, 
y: data,
data:data

	} 
}



function lineplot(text, x_col, y_col)
{
    console.log("start");
    var iterator=0;// for iterating the loop
    var a_labels= new Array();
    var c_array=new Array();
    var adder=0;// the indices of a_labels array
    var c_adder=0;//the indices of c_addr array
    var data ={'x':"",'y':0};
    //var data={x=new String(), y=new int()};
    let x_index;
     let y_index;
     let it=0;
     let arrsa = [];
    
    d3.text(text, function(text) {
      var data1 = d3.csvParseRows(text).map(function(row, index) {
     
        console.log('row', row);
        console.log(' row index', index);
        return row.map(function(value, ind) {
          if(index===0)
          {
            console.log('row value',value);
            console.log('row x_col',x_col);
            if(value.localeCompare(x_col)==0)
            {
              arrsa[0] = 1;
              console.log('row x_index',value);
              console.log('row x_index',ind);
              if(x_index==undefined)
               x_index=it;
               
            }

            if(value==y_col)
            {
              arrsa[1] = 2;
              console.log('row y_index',value);
              console.log('row y_index',ind);
              if(y_index==undefined)
               y_index=it;
               
            }
          }
          it++;
        });        
      })
    });

      console.log('x_index', arrsa);
      console.log('y_index', y_index);
   let prev=0;
  
    d3.text(text, function(text) {
  var data = d3.csvParseRows(text).map(function(row,index) {
    // console.log('row', row);
    
      console.log('iter y_index', y_index);
    return row.map(function(value,ind) {
      console.log('iter x_index', ind);
        if(ind === x_index) 
        {
            console.log(value);
            a_labels[adder]=value;
            adder++;
        }
        else if(ind === y_index) 
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

  var maximum=0;
  var obj=[];
	for(b=0; b<c_array.length; b++){
        if(maximum<c_array[b])
        {
            maximum=c_array[b];
        }
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




    var ctx = document.getElementById("lineChart").getContext('2d');



 
    {
	var myChart = new Chart(ctx, {
    type: 'line',
    
    //data: obj,
    data: {
        labels: a_labels,
        datasets:[ 
            {
                data:c_array,
        fill: false,
        borderColor: '#11a4ed', // Add custom color border (Line)
        backgroundColor: '#11a4ed', // Add custom color background (Points and Fill)
            borderWidth: 1 
    }]},
    options: {
        elements: {
            line: {
                tension: 0
            }
        },
       
		title: {
			display: false,
			
            text: 'Average # of Expenses/Report per Day'
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
          responsive: false,
          maintainAspectRatio: false, // Instruct chart js to respond nicely.
          //devicePixelRatio: 2,
    }
    
});


   }


});

	//const lifeExp = 'Average # of Expenses/Report per Day';
	//let dataAsJson = JSC.csv2Json(text);
	
	
//	console.log("rating ");
//	console.log(counts);
	
}