var express = require('express');
var router = express.Router();
var axios = require('axios');

router.use(require('cookie-parser')());

router.get('/', async function(req, res, next) {

    var url = 'http://localhost:50929/api/';
	var cookieValue = req.cookies.id;
	var user = [];
	try {
		const response = await axios.get(url + '/Users/GetUsers/' + cookieValue);

	if (response.status == '200'){
  
		user = response.data;	
		user.birthdate = user.birthdate.replace(/(\d*)-(\d*)-(\d*).*/, '$3-$2-$1');	
  
	}
	}catch (error) {
	console.log('Erro');
    }
    
    res.render('profile', { title: 'Express', user: user });
});
  
module.exports = router;