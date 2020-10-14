
    var count=0;
    var state;
  function  updateGraph(para1,para2)
    {
       //if(para2==='bar' && count==0)
       //{
         //   state=barChart(para1,null);
       //}
       if(para2==='bar')
            barChart(para1);

        if (para2==='line')
        renderChart(para1);

        if(para2==='pie')
            lineChart(para1);
      //  if(para2==='line')
       //{
         //   state=renderChart(para1,state);
       //}

       //if(para2==='bar')
       //{
         //   state=barChart(para1,state);
       //}
      
        
    }

function shadowSetter(){
    var value=document.getElementById("vol").value.toString();
    console.log( "document.getElementById.stdDeviation.value");
    document.getElementById("blurs").setAttribute("stdDeviation",value);
    //console.log( document.getElementById("blurs").stdDeviation.value);
    //document.getElementById("blurs").stdDeviation.value=value;
}



