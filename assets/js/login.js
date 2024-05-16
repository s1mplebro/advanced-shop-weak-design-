let form = document.querySelector(".form");
let login = document.querySelector("#loginto");
let passwor = document.querySelector("#password2");
let send = document.querySelector(".submit");


form.addEventListener('submit',function(e) {
    e.preventDefault();
    let username = login.value;
let password = passwor.value;
    let users = JSON.parse(localStorage.getItem('users')) || [];
    for (let i = 0; i < users.length; i++) {
        if (username === 'mor_2314' && password === '83r5^_') {
           
        alert('user found');
        window.location.href = `/assets/pages/home/home.html`; 
        login.value = '';
        passwor.value = '';
            
        }else{
            alert('there is no such user')
            break;
        }
        
    }
   
    
})