var url = 'http://localhost:50929/api';

//Método responsável por abrir o modal de alterar senha assim que a rota /newpassword é acessada
$(document).ready(function(){
    // Show the Modal on load
    $("#modal-default1").modal("show");

  });

async function newPassword() {
     
    var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)id\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    var x = document.getElementById('modal2').value;
    var y = document.getElementById('modal3').value;
    console.log(cookieValue);
    try {
        const response = await axios.post( url + '/Users/newPassword',
        {id: cookieValue, new_password: x, confirm_password: y});
      console.log(response);
      console.log(response.status);

      if (response.status == '200'){
        console.log('Logado');
        window.location.href = '/home';
      }

    } catch (error) {

      console.log('Deu erro');
      console.log(error);
      //console.log(error.response.status);

      swal("Falha no alteração da senha!", "Verifique se os campos informados estão corretos.", "error");
      
           
    }

}
