var urlProtheus = 'http://localhost:1243/rest/teste';

async function generateTable() {
 
    var username = 'user';
    var password = 'password';
    var basicAuth = 'Basic ' + btoa(username + ':' + password);
    
    try {


        const response = await axios.get( urlProtheus + '/products',
        {email: x, password: y}, {headers: {'Authorization': + basicAuth}});
      console.log(response);
      console.log(response.status);

      if (response.status == '200'){
        console.log(a);        

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