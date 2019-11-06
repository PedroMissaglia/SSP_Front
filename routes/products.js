var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/', async function(req, res, next) {

    var address = 'http://localhost:1243/rest/teste';
    var urlProtheusProducts = address + '/products';
    var urlProtheusTop3 = address + '/top3';
    var urlProtheusLotValidity = address + '/lotValidity';
    var urlProtheusCompEst = address + '/getCompEstoque';
    var basicAuth = 'Basic YWRtaW46IA==';
    var Jsondata;
    let products = [];
    let top3 = [];
    let lotValidity = [];
    let compEstoque = [];

    try {
        const response = 
        await axios.get( urlProtheusProducts,
          {headers: {'Authorization': basicAuth}}
        );
        Jsondata = response.data;
      if (response.status == '200'){
        products = Jsondata.products
      }
    } catch (error) {
      console.log('Erro');
    }
  
    try {
      const response = 
      await axios.get( urlProtheusTop3,
        {headers: {'Authorization': basicAuth}}
      );
      Jsondata = response.data;
    if (response.status == '200'){
      top3 = Jsondata.products
      console.log(top3);
    }
    } catch (error) {
    console.log('Erro');
    }
  
    try {
      const response = 
      await axios.get( urlProtheusLotValidity,
        {headers: {'Authorization': basicAuth}}
      );
      Jsondata = response.data;
    if (response.status == '200'){
      lotValidity = Jsondata.products
      console.log(lotValidity);
    }
    } catch (error) {
    console.log('Erro');
    }

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
        mydatasets.push(compEstoque[j].description)
      }

      var donutChartCanvas = $('#donutChart').get(0).getContext('2d')
      var donutData = {
        labels: [
            'Chrome', 
            'IE',
            'FireFox', 
            'Safari', 
            'Opera', 
            'Navigator', 
            ],
        datasets: [
          {
            data: [700,500,400,600,300,100],
            backgroundColor : ['#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de'],
          }]
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

    res.render('products', { title: 'Express', products: products, top3: top3, lotValidity: lotValidity });
  });
  
  
  module.exports = router;
  