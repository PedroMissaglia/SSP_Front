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

    var lineChartCanvas = $('#lineChart').get(0).getContext('2d')
    var lineChartOptions = jQuery.extend(true, {}, areaChartOptions)
    var lineChartData = jQuery.extend(true, {}, areaChartData)
    lineChartData.datasets[0].fill = false;
    lineChartData.datasets[1].fill = false;
    lineChartOptions.datasetFill = false

    var lineChart = new Chart(lineChartCanvas, { 
      type: 'line',
      data: lineChartData, 
      options: lineChartOptions
    })
    }}catch (error) {
    console.log('Erro');
    } })