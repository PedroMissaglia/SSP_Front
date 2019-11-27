async function createTask() {
     
    var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)id\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    var x = document.getElementById('task1').value;
    var y = document.getElementById('task2').value;
    var url = 'http://localhost:50929/api';
 
    try {
        const response = await axios.post( url + '/Tasks/add/' + cookieValue,
        {name: x, date: y});
      console.log(response);
      console.log(response.status);

      if (response.status == '200'){

        swal("Pronto!", "Tarefa adicionada.", "success", 3000);
        window.location.href = '/home';
      }
    } catch (error) {

      if (error.response.status == '412'){

        swal("Ops!", "Verifique se todos os campos foram preenchidos.", "error");
      } 
      else{
        swal("Ops!", "Parece que estamos com uma instabilidade, por favor tente novamente mais tarde.", "error");
      }       
    }
}

async function deleteTask(id, name) {

    document.getElementById("a").innerHTML = 'Confirma a exclusão da tarefa ' + name + '?';

    $('#modal3-default').modal('show');

    $('button[name="buttona"]').on('click', async function(e) {
        var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)id\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        var url = 'http://localhost:50929/api';

    try {
        const response = await axios.post( url + '/Tasks/delete/' + cookieValue,
        {id: id});
      console.log(response);
      console.log(response.status);

      if (response.status == '200'){

        swal("Pronto!", "Tarefa excluída com sucesso.", "success");
        window.location.href = '/home';
      }
    } catch (error) {

        swal("Ops!", "Parece que estamos com uma instabilidade, por favor tente novamente mais tarde.", "error");
           
    }
        })
}

async function updateTask(id, name, date) {

    $('#modal2-default').modal('show');

    $('button[name="button1"]').on('click', async function(e) {
        var x = document.getElementById('alter1').value;
        var y = document.getElementById('alter2').value;
        var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)id\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        var url = 'http://localhost:50929/api';

    try {
        const response = await axios.post( url + '/Tasks/upd/' + cookieValue,
        {id: id, name: x, date: y, usersId: cookieValue});
      console.log(response);
      console.log(response.status);

      if (response.status == '200'){

        swal("Pronto!", "Tarefa alterada com sucesso.", "success");
        window.location.href = '/home';
      }
    } catch (error) {

        swal("Ops!", "Parece que estamos com uma instabilidade, por favor tente novamente mais tarde.", "error");
           
    }
        })
}

