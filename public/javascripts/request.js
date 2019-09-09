var url = 'http://localhost:50929/api';

async function validateLogin() {
    
    var x = document.forms["loginForm"]["email"].value;
    var y = document.forms["loginForm"]["senha"].value;
    
    if (x == "" || y == "") {
        alert("Existem campos em branco.");
        return false;
      }

    try {
        const response = await axios.post( url + '/User/login',
        {email: x,
          password: y});
      console.log(response);
    } catch (error) {
      console.error(error);
    }
}

async function validateForm(email, senha) {
    
    var x = document.forms["loginForm"]["email"].value;
    var y = document.forms["loginForm"]["senha"].value;

    if (x == "") {
      alert("Name must be filled");
      return false;
    }
    if (y == "") {
        alert("Password must be filled");
        return false;
      }
    try {
      const response = await axios.post( url + '/User/login',
      {email: [email],
        password: [senha]});
      console.log(response);
    } catch (error) {
      console.error(error);
    }
}