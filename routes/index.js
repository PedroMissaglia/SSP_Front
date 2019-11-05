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

router.get('/purchases', async function(req, res, next) {
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

router.get('/products', async function(req, res, next) {

  var urlProtheusProducts = 'http://localhost:1243/rest/teste/products';
  var urlProtheusTop3 = 'http://localhost:1243/rest/teste/top3';
  var basicAuth = 'Basic YWRtaW46IA==';
  var Jsondata;
  let products = [];
  let top3 = [];
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
  res.render('products', { title: 'Express', products: products, top3: top3 });
});


module.exports = router;
