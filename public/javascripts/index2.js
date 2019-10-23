async function nameUser() {

	var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)id\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	var a = document.getElementById('nameUser').innerHTML;
	try {
		const response = await axios.post(url + '/Users/GetUsers/' + cookieValue);

		if (response.status == '200') {
			document.getElementById("nameUser").innerHTML = response.data.name;
		}

	} catch (error) {

		console.log('Deu erro no nome');
		console.log(error);
	}

}