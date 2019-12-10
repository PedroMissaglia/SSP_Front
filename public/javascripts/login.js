var url = 'http://localhost:50929/api';

async function validateLogin() {
     
    var x = document.getElementById('1').value;
    var y = document.getElementById('2').value;
    var url = 'http://localhost:50929/api';
 
    try {
      console.log('a');
        const response = await axios.post( url + '/Users/login',
        {email: x, password: y});
      console.log(response);
      console.log(response.status);

      if (response.status == '200'){
        console.log('Logado');
		document.cookie = "id = " + response.data.id;
        window.location.href = '/home';
        console.log(response.status);

      }
    } catch (error) {

      console.log('Deu erro');
      console.log(error);
      console.log(error.response.status);
      if (error.response.status == '412'){
        document.getElementById("1").className = 'form-control is-invalid';
        document.getElementById("2").className = 'form-control is-invalid';

        swal("Ops!", "Verifique seu e-mail e senha.", "error");
      } 
      else if (error.response.status == '422'){
        console.log('E-mail não cadastrado.');
        document.getElementById("1").className = 'form-control is-invalid';
        swal("Ops!", "E-mail não cadastrado.", "error");
        
      }
      else{
        console.log('Ops, parece que estamos com uma instabilidade, volte mais tarde.');
      }       
    }

}

//Função para validar login

async function sendPasswordEmail() {
    
  var x = document.getElementById('modal1').value;

  try {

		const response1 = await axios.post(url + '/Users/getIdUser',
			{ email: x });				
		console.log(response1);
		console.log(response1.status);

		if (response1.status == '200') {
			document.cookie = "id = " + response1.data.id;
				const response = await axios.post( url + '/Users/forgotPassword',
				{email: x});
			console.log(response);
			console.log(response.status);
			
			if (response.status == '200'){
				console.log('Envio realizado com sucesso');
				//$('#modal-default').modal('close');
        swal("Pronto!", "Enviamos o e-mail com sucesso.", "success");
      
			}
		}
			
  } catch (error) {
    
    swal("Ops!", "Parece que não conseguimos enviar o e-mail.", "error");
    //window.location.href = '/';
    }       
  }

//Função para mostrar senha

function showPassword() {
  var x = document.getElementById("2");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

