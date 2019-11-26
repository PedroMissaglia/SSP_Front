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

function validarSenhaProfile() {

	var senha = document.getElementById('modal2').value;
	var resenha = document.getElementById('modal3').value;

	if (senha != resenha) {
		swal("SENHAS DIFERENTES!", "FAVOR DIGITAR SENHAS IGUAIS", "error");
	}
}

async function newPasswordByProfile() {

	var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)id\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	var senhaAnt = document.getElementById('m1').value;
	var senha = document.getElementById('modal2').value;
	var resenha = document.getElementById('modal3').value;
	console.log(cookieValue);
	try {
		const response = await axios.post(url + '/Users/newPasswordByProfile',
			{ id: cookieValue, atl_password: senhaAnt, new_password: senha, confirm_password: resenha });
		console.log(response);
		console.log(response.status);

		if (response.status == '200') {
			console.log('Senha Alterada');
			window.location.href = '/profile';
		}

	} catch (error) {

		console.log('Deu erro');
		console.log(error);
		//console.log(error.response.status);

		swal("Falha no alteração da senha!", "Verifique se os campos informados estão corretos.", "error");


	}

}

async function nameUserProfile() {

	var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)id\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	var a = document.getElementById('nameUser').innerHTML;
	try {
		const response = await axios.get(url + '/Users/GetUsers/' + cookieValue);

		if (response.status == '200') {
			document.getElementById("nameUser").innerHTML = response.data.name;
		}

	} catch (error) {

		console.log('Deu erro no nome');
		console.log(error);
	}

}

async function loadUserProfile() {

	var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)id\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	var data;
	var data2;
	try {
		const response = await axios.post(url + '/Users/GetUsers/' + cookieValue);

		if (response.status == '200') {

			data = response.data.birthdate
			data2 = data.replace(/(\d*)-(\d*)-(\d*).*/, '$1-$2-$3');
			document.getElementById('1').setAttribute("placeholder", response.data.name);
			document.getElementById('2').setAttribute("placeholder", response.data.cpf);
			document.getElementById('3').setAttribute("value", data2);
			document.getElementById('4').setAttribute("placeholder", response.data.email);
		}

	} catch (error) {

		console.log('Deu erro');
		console.log(error);
	}

}