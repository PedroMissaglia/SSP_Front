var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/', async function(req, res, next) {
    var urlProtheusPurchases = 'http://localhost:1243/rest/teste/purchases';
    var basicAuth = 'Basic YWRtaW46IA==';
    var Jsondata;
    let purchases = [];
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
    res.render('purchases', { title: 'Express', purchases: purchases });
  });
  
  
  module.exports = router;