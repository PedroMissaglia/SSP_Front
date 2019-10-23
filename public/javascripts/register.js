var url = 'http://localhost:50929/api';

async function validateForm() {

	console.log('a');
	var nome = document.getElementById('1').value;
	var cpf = document.getElementById('2').value;
	var birthdate = document.getElementById('3').value;
	var email = document.getElementById('4').value;
	var autenticacao = document.getElementById('5').value;
	var senha = document.getElementById('6').value;

	try {
		const response = await axios.post(url + '/Users/signup',
			{
				name: nome,
				cpf: cpf,
				birthdate: birthdate,
				email: email,
				tokenId: autenticacao,
				password: senha

			});
		console.log(response);
		console.log(response.status);

		if (response.status == '200') {
			console.log('Logado');
			document.cookie = "id = " + response.data.id;
			window.location.href = '/home';
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

//adiciona mascara ao CPF
function MascaraCPF(cpf) {
	if (mascaraInteiro(cpf) == false) {
		event.returnValue = false;
	}
	return formataCampo(cpf, '000.000.000-00', event);
}

//valida o CPF digitado
function ValidarCPF(Objcpf) {
	var cpf = Objcpf.value;
	var exp = /\.|\-/g;
	var i ;

	cpf = cpf.toString().replace(exp, "");
	var digitoDigitado = eval(cpf.charAt(9) + cpf.charAt(10));
	var soma1 = 0, soma2 = 0;
	var vlr = 11;

	for (i = 0; i < 9; i++) {
		soma1 += eval(cpf.charAt(i) * (vlr - 1));
		soma2 += eval(cpf.charAt(i) * vlr);
		vlr--;
	}
	soma1 = (((soma1 * 10) % 11) == 10 ? 0 : ((soma1 * 10) % 11));
	soma2 = (((soma2 + (2 * soma1)) * 10) % 11);

	var digitoGerado = (soma1 * 10) + soma2;
	if (digitoGerado != digitoDigitado){
		swal("Ops!","CPF Invalido!", "error");
	}
}

//valida numero inteiro com mascara
function mascaraInteiro(x) {
	if (event.keyCode < 48 || event.keyCode > 57) {
		event.returnValue = false;
		return false;
	}
	return true;
}

//formata de forma generica os campos
function formataCampo(campo, Mascara, evento) {
	var boleanoMascara;
	var exp;
	var Digitato = evento.keyCode;
	var i;
	var campoSoNumeros;

	exp = /\-|\.|\/|\(|\)| /g;
	campoSoNumeros = campo.value.toString().replace(exp, "");

	var posicaoCampo = 0;
	var NovoValorCampo = "";
	var TamanhoMascara = campoSoNumeros.length;
	
	if (Digitato != 8) { // backspace 
		for (i = 0; i <= TamanhoMascara; i++) {
			boleanoMascara = ((Mascara.charAt(i) == "-") || (Mascara.charAt(i) == ".")
				|| (Mascara.charAt(i) == "/"))
			boleanoMascara = boleanoMascara || ((Mascara.charAt(i) == "(")
				|| (Mascara.charAt(i) == ")") || (Mascara.charAt(i) == " "))
			if (boleanoMascara) {
				NovoValorCampo += Mascara.charAt(i);
				TamanhoMascara++;
			} else {
				NovoValorCampo += campoSoNumeros.charAt(posicaoCampo);
				posicaoCampo++;
			}
		}
		campo.value = NovoValorCampo;
		return true;
	} else {
		return true;
	}
}

function validarSenha() {

var senha = document.getElementById('6').value;
var resenha = document.getElementById('7').value;

	if (senha != resenha){
		swal("SENHAS DIFERENTES!" , "FAVOR DIGITAR SENHAS IGUAIS", "error");
	}
}

