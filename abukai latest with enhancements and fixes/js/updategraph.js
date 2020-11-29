
    var count=0;
    var state;
  function  updateGraph(para1,para2)
    {
       //if(para2==='bar' && count==0)
       //{
         //   state=barChart(para1,null);
       //}
       if(para2==='bar')
       {
        document.getElementById("loader").style.display="block";
        document.getElementById("myChart").style.display="none";
        document.getElementById("chart").style.display="none";
        document.getElementById("barChart").style.display="none";
        setTimeout(function(){ barChart(para1); }, 1500);
            //barChart(para1);
       }

        if (para2==='line')
        {
          document.getElementById("loader").style.display="block";
          document.getElementById("myChart").style.display="none";
          document.getElementById("chart").style.display="none";
          document.getElementById("barChart").style.display="none";
          setTimeout(function(){ renderChart(para1); }, 1500);
        //renderChart(para1);
        }

        if(para2==='pie')
        {
          document.getElementById("loader").style.display="block";
          document.getElementById("myChart").style.display="none";
          document.getElementById("chart").style.display="none";
          document.getElementById("barChart").style.display="none";
          setTimeout(function(){ lineChart(para1); }, 1500);
            
        }
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



