let loginPage = document.getElementById('login-page');
let registerPage = document.getElementById('register-page');
let toRegisterLink = document.getElementById('to-register');
let toLoginLink = document.getElementById('to-login');
let loginForm = document.getElementById('login-form');
let registerForm = document.getElementById('register-form');


function showLoginPage() {
  loginPage.classList.remove('hidden');
  registerPage.classList.add('hidden');
}

function showRegisterPage() {
  loginPage.classList.add('hidden');
  registerPage.classList.remove('hidden');
}


toRegisterLink.addEventListener('click', function(event) {
  event.preventDefault(); 
  showRegisterPage();
});


toLoginLink.addEventListener('click', function(event) {
  event.preventDefault(); 
  showLoginPage(); 
});


loginForm.addEventListener('submit', function(event) {
  event.preventDefault(); 
  loginPage.classList.add('hidden'); 
});


registerForm.addEventListener('submit', function(event) {
  event.preventDefault(); 
  registerPage.classList.add('hidden'); 
});