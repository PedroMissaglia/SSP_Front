var express = require('express');
var router = express.Router();
var axios = require('axios');


router.use(require('cookie-parser')());

/* GET home page. */
router.get('/', async function(req, res, next) {

    var url = 'http://localhost:50929/api/';
	var cookieValue = req.cookies.id;
	var user = [];
	try {
		const response = await axios.get(url + '/Users/GetUsers/' + cookieValue);

	if (response.status == '200'){
        

        user = response.data;	
        new Date(user.birthdate)
	  	console.log(user);
  
	}
	}catch (error) {
	console.log('Erro');
	}

    res.render('index2', { title: 'Express' , user: user});
});
 
module.exports = router;
  