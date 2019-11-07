var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/', async function(req, res, next) {

    var address = 'http://localhost:1243/rest/teste';
    var urlProtheusProducts = address + '/products';
    var urlProtheusTop3 = address + '/top3';
    var urlProtheusLotValidity = address + '/lotValidity';
    var urlProtheusSaldoSeg = address + '/saldoSeguranca';
    var basicAuth = 'Basic YWRtaW46IA==';
    var Jsondata;
    let products = [];
    let top3 = [];
    let lotValidity = [];
    let saldoSeguranca = [];

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
      await axios.get( urlProtheusSaldoSeg,
        {headers: {'Authorization': basicAuth}}
      );
      Jsondata = response.data;
    if (response.status == '200'){
      saldoSeguranca = Jsondata.products
    }
    } catch (error) {
    console.log('Erro');
    }

    res.render('products', { title: 'Express',
     products: products,
     top3: top3,
     lotValidity: lotValidity,
     saldoSeguranca: saldoSeguranca });
  });
  
  
  module.exports = router;
  