




function barplot(text, x_col, y_col)
{
 
    var iterator=0;// for iterating the loop
    var a_labels= new Array();
    var c_array=new Array();
    var adder=0;// the indices of a_labels array
    var c_adder=0;//the indices of c_addr array

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


  var obj=[];
	for(b=0; b<c_array.length; b++){
        //datas[b].x=a_labels[b];
        // datas[b].y=c_array[b];
		//console.log(counts[b]);
        //obj.push(getDataset(a_labels,(c_array))); 
        obj.push(getDataset(a_labels[b],c_array[b]));
};




    
    var ctx = document.getElementById("barChart").getContext('2d');


   {
	var myChart = new Chart(ctx, {
    type: 'bar',
    
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
		title: {
			display: false,
			
    },
		legend: {
			display: false,
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

    }

});
	
}
