var express = require('express');
var router = express.Router();
var axios = require('axios');


router.use(require('cookie-parser')());

/* GET home page. */
router.get('/', async function(req, res, next) {

    var url = 'http://localhost:50929/api/';
	var cookieValue = req.cookies.id;
	var user = [];
	var tasks = [];
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

	try {
		const response = await axios.get(url + '/Tasks/list/' + cookieValue);

		if (response.status == '200'){
        	tasks = response.data;	
	}
	}catch (error) {
	console.log('Erro');
	}

	for(var j = 0; j < tasks.length; j++) {
		 tasks[j].date = tasks[j].date.replace(/(\d*)-(\d*)-(\d*).*/, '$2/$3/$1');	
	  }

	res.render('index2', { title: 'Express' ,
	 	user: user,
		tasks: tasks});
});
 
module.exports = router;
  