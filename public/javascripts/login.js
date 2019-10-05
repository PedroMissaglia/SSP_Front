var url = 'http://localhost:50929/api';

async function validateLogin() {
    
    var x = document.getElementById('1').value;
    var y = document.getElementById('2').value;
  
    try {
        const response = await axios.post( url + '/User/login',
        {email: x,
          password: y});
      console.log(response);
      console.log(response.status);

      if (response.status == '200'){
        console.log('Logado');
        window.location.href = '/home';
      }
    } catch (error) {

      console.log(error);
      console.log(error.response.status);
      if (error.response.status == '412'){
        document.getElementById("1").className = 'form-control is-invalid';
        document.getElementById("2").className = 'form-control is-invalid';

        swal("Ops!", "Verifique seu e-mail e senha.", "error");
      } 
      else if (error.response.status == '422'){
        console.log('E-mail não cadastrado.');
        document.getElementById("1").style.borderLeftColor = 'rgba(255, 0, 0, 0.5)';
        swal("Ops!", "E-mail não cadastrado.", "error");
      }
      else{
        console.log('Ops, parece que estamos com uma instabilidade, volte mais tarde.');
      }       
    }

}
