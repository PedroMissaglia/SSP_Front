var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index2', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

router.get('/profile', function(req, res, next) {
  res.render('profile', { title: 'Express' });
});

router.get('/newpassword', function(req, res, next) {
  res.render('newpassword', { title: 'Express' });
});


router.get('/404', function(req, res, next) {
  res.render('404', { title: 'Express' });
});

router.get('/products', async function(req, res, next) {

  var urlProtheus = 'http://localhost:1243/rest/teste/products';
  var basicAuth = 'Basic YWRtaW46IA==';
  var Jsondata;
  let products = [];
  var i;
  try {
      const response = 
      await axios.get( urlProtheus,
        {headers: {'Authorization': basicAuth}}
      );
      console.log(response);
      Jsondata = response.data;
      console.log(Jsondata);
      console.log(response.status);
    if (response.status == '200'){
      products = Jsondata.products

      /*for(i = 0; i< products.length; i++){
        if(products[i].address_control == 'N'){
          products[i].address_control = 'aaaaa'
        }
      }*/
    }
  } catch (error) {
    console.log('Erro');
  }
  res.render('products', { title: 'Express', products: products });
});


module.exports = router;
