function barChart(c)
    {
       
        bplotss(c);
    }

    function getDataset(index, data) { 
      return { 
      x: index, 
      y: data,
      data:data
      
        } 
      }


function bplotss(text)
{

    var iterator=0;// for iterating the loop
    var a_labels= new Array();
    var c_array=new Array();
    var adder=0;// the indices of a_labels array
    var c_adder=0;//the indices of c_addr array
    var data ={'x':"",'y':0};
    
    
    console.log('text', text);
   
    d3.text(text, function(text) {
  var data = d3.csvParseRows(text).map(function(row, rowindex) {
    console.log('row',row);
    return row.map(function(value, index) {
      if(rowindex===0)
      {
        if(index>0)
        {
          a_labels[index-1] =  value;
        }
      }
      else if(rowindex===1)
      {
        if(index>0)
        {
          value = value.replace(',','');
        c_array[index-1]=parseInt(value);
        }
      }
      console.log('now iterator', iterator);
      console.log('now index', index);
      console.log('now row index', rowindex);
      console.log('now a_labels', a_labels);
      console.log('now c)array', c_array);
        // if(iterator>1 && iterator%2==0) 
        // {
        //     console.log(value);
        //     a_labels[adder]=value;
        //     adder++;
        // }
        // else if(iterator>1 && iterator%2!=0) 
        // {
        //     console.log(value);
        //     c_array[c_adder]=parseInt(value);
        //     c_adder++;
        // }
      iterator++;
    }, console.log('iterator', iterator));
    
  });

  console.log('data', a_labels);
  console.log('data', c_array);
 
  //console.log(data);
  console.log("total data");
  console.log(a_labels);
  console.log(c_array);
  // c_array.reverse();
  // a_labels.reverse();


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

console.log("obj",obj);

    
    var ctx = document.getElementById("barChart").getContext('2d');



    //ctx.clearRect(0,0,1000,601);

    
    //var line=document.getElementById("myChart");
    //var pie=document.getElementById("pieChart");

   // if(ctx.style.display==="none")
   // {
   //     console.log("in block");
   //     bar.style.display="block";
   // }


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
            borderColor: '#eb9834', // Add custom color border (Line)
            backgroundColor: '#346beb', // Add custom color background (Points and Fill)
            borderWidth: 1 
    }]},
    options: {    
		title: {
			display: false,
			
            text: 'Historical Revenue Chart'
    },
		legend: {
			display: false,
        },
        scales: {
          xAxes: [{
            gridLines: {
              offset: true,
              display: false,
              color: "black"
            },
           min:0,
          }],
          yAxes: [{
            gridLines: {
              drawBorder: false,
              color: "black",
              borderDash: [2, 5],
            },
            ticks: {                  
              min:0,
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
