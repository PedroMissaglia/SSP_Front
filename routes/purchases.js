var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/', async function(req, res, next) {
    
    var address = 'http://localhost:1243/rest/teste';
    var urlProtheusPurchases = address + '/purchases';
    var urlProtheusSaldoSeg = address + '/saldoSeguranca';
    var basicAuth = 'Basic YWRtaW46IA==';
    var Jsondata;
    let purchases = [];
    let saldoSeguranca = [];

    try {
        const response = 
        await axios.get( urlProtheusPurchases,
          {headers: {'Authorization': basicAuth}}
        );
        Jsondata = response.data;
      if (response.status == '200'){
        purchases = Jsondata.purchases
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

    res.render('purchases', { title: 'Express',
     purchases: purchases,
    saldoSeguranca: saldoSeguranca });
  });
  
  
  module.exports = router;