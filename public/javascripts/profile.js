var url = 'http://localhost:50929/api';

async function profileForm() {

	var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)id\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	var nome = document.getElementById('1').value;
	var cpf = document.getElementById('2').value;
	var birthdate = document.getElementById('3').value;
	var email = document.getElementById('4').value;
	var autenticacao = document.getElementById('5').value;

	if (birthdate == null || birthdate == undefined || birthdate == "") {
		birthdate = "01/01/0001 00:00:00";
	}

	if (autenticacao == null || autenticacao == undefined || autenticacao == "") {
		autenticacao = '00000000-0000-0000-0000-000000000000'
	}

	try {
		const response = await axios.post(url + '/Users/updateUsers/' + cookieValue,
			{
				name: nome,
				cpf: cpf,
				birthdate: birthdate,
				email: email,
				tokenId: autenticacao,

			});
		console.log(response);
		console.log(response.status);

		if (response.status == '200') {
			console.log('Alterado');
			window.location.href = '/profile';
		}
	} catch (error) {
		console.log(error);
		console.log(error.response.status);
		if (error.response.status == '412') {
			document.getElementById("5").className = 'form-control is-invalid';

			swal("Ops!", "Autenticação inválida.", "error");
		}
		else if (error.response.status == '422') {
			console.log('E-mail já cadastrado.');
			document.getElementById("4").style.borderLeftColor = 'rgba(255, 0, 0, 0.5)';
			swal("Ops!", "E-mail já cadastrado.", "error");
		}
		else {
			console.log('Ops, parece que estamos com uma instabilidade, volte mais tarde.');
		}
	}
}

