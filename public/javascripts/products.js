$(async function () {
  
  var address = 'http://localhost:1243/rest/teste';
  var urlProtheusCompEst = address + '/getCompEstoque';
  let compEstoque = [];
  var basicAuth = 'Basic YWRtaW46IA==';
  var Jsondata;
  var mylabel = [];
  var mydata = [];

  try {
    const response = 
    await axios.get( urlProtheusCompEst,
      {headers: {'Authorization': basicAuth}}
    );
    Jsondata = response.data;
  if (response.status == '200'){
    compEstoque = Jsondata.products

    console.log(compEstoque);
    
    var mydatasets = [];

    for(var j = 0; j < compEstoque.length; j++) {
      mylabel.push(compEstoque[j].description)
      mydata.push(compEstoque[j].quantity)
    }

    var donutChartCanvas = $('#donutChart').get(0).getContext('2d')
    var donutData        = {
      labels: mylabel,
      datasets: [
        {
          data: mydata,
          backgroundColor : ['#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de'],
        }
      ]
    }
    var donutOptions     = {
      maintainAspectRatio : false,
      responsive : true,
    }
    var donutChart = new Chart(donutChartCanvas, {
      type: 'doughnut',
      data: donutData,
      options: donutOptions      
    })
  }
  }catch (error) {
  console.log('Erro');
  }
})    