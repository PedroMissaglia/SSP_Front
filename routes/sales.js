var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/', async function(req, res, next) {

    var address = 'http://localhost:1243/rest/teste';
    var urlProtheusprofitVenda = address + '/lucroVenda';
    var urlProtheusTopClientesValor = address + '/clienteValor';
    var basicAuth = 'Basic YWRtaW46IA==';
    var Jsondata;
    let lucroVenda = [];
    let clientesValor = [];

    try {
        const response = 
        await axios.get( urlProtheusprofitVenda,
          {headers: {'Authorization': basicAuth}}
        );
        Jsondata = response.data;
      if (response.status == '200'){
        lucroVenda = Jsondata.products
      }
    } catch (error) {
      console.log('Falha ao listar os produtos.');
    }

    try {
        const response = 
        await axios.get( urlProtheusTopClientesValor,
          {headers: {'Authorization': basicAuth}}
        );
        Jsondata = response.data;
      if (response.status == '200'){
        clientesValor = Jsondata.clients
      }
    } catch (error) {
      console.log('Falha ao listar os produtos.');
    }
    
    res.render('sales', { title: 'Express',
     lucroVenda: lucroVenda,
    clientesValor: clientesValor});
  });

module.exports = router;
