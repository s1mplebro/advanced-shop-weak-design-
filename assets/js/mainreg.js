let form = document.querySelector(".form");
let login = document.querySelector(".userlogin");
let passwor = document.querySelector(".userpassword");
let send = document.querySelector(".submit");


form.addEventListener('submit',function(e) {
    e.preventDefault();
    let username = login.value;
let password = passwor.value;
    // console.log(login.value,password.value);
    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.username === username) || users.some(user => user.password === password)) {
        alert('user or login exists')
    }else{
        users.push({ username,password });
        let token = generateToken();

        // Save the token
        localStorage.setItem('token', token);
    localStorage.setItem('users', JSON.stringify(users));  
    window.location.href = `/assets/pages/home/home.html`; 
        login.value = '';
        passwor.value = '';
    }
    
})

function generateToken() {
    // Generate a random token (you might want to use a more secure method)
    return Math.random().toString(36).substring(7);
}