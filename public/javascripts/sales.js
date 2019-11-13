$(async function () {

    var address = 'http://localhost:1243/rest/teste';
    var urlProtheusClienteQuant = address + '/clienteQuant';
    let clienteQuant = [];
    var basicAuth = 'Basic YWRtaW46IA==';
    var Jsondata;

    var areaChartData = {
        datasets: [],
        labels: ['Quantidade de Vendas']
    }

    try {
        const response = 
        await axios.get( urlProtheusClienteQuant,
          {headers: {'Authorization': basicAuth}}
        );
        Jsondata = response.data;
      if (response.status == '200'){
        clienteQuant = Jsondata.clients

        for(var j = 0; j < clienteQuant.length; j++) {
            areaChartData.datasets.push({
                label               : clienteQuant[j].name,
                backgroundColor     : 'rgba(60,141,188,0.9)',
                borderColor         : 'rgba(60,141,188,0.8)',
                pointRadius          : false,
                pointColor          : '#3b8bba',
                pointStrokeColor    : 'rgba(60,141,188,1)',
                pointHighlightFill  : '#fff',
                pointHighlightStroke: 'rgba(60,141,188,1)',
                data                : [clienteQuant[j].quant]
              });
          }

        console.log(areaChartData);  
        var barChartCanvas = $('#barChart').get(0).getContext('2d')
        var barChartData = jQuery.extend(true, {}, areaChartData)


        var barChartOptions = {
        responsive              : true,
        maintainAspectRatio     : false,
        datasetFill             : false
        }

        var barChart = new Chart(barChartCanvas, {
        type: 'bar', 
        data: barChartData,
        options: barChartOptions
        })

    }
    }catch (error) {
    console.log('Erro');
    }
});    