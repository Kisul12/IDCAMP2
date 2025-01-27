const indexPage = document.getElementById('beranda');
const bookPage = document.getElementById('buku');
const loginPage = document.getElementById('login');

const loginStatus = false;

// Navigasi    
indexPage.addEventListener('click', () => {
    window.location.href = 'index.html'
})

bookPage.addEventListener('click', () => {
    if (loginStatus === false) {
        alert('Anda harus login terlebih dahulu');
        window.location.href = 'login.html';
        return;
    } else {
        window.location.href = 'book.html';
    }
})

loginPage.addEventListener('click', () => {
    window.location.href = 'login.html'
})

const userAcc = 'user1';
const passAcc = 'pass1';

const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (event) => {
    login(usernameInput.value, passwordInput.value);
    event.preventDefault();
})

// Check login
function login(user, pass) {
    if (user === userAcc && pass === passAcc) {
        window.location.href = 'dashboard.html';
    } else {
        alert('Username atau password salah');
    }
}







