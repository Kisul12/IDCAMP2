// const judul = document.querySelector('.nav h1');

// judul.addEventListener('click', () => {
//     alert('MyBook App');
// })

const dashboardPage = document.getElementById('beranda-dashboard');
const bookPage = document.getElementById('buku');
const addBookPage = document.getElementById('tambah');

dashboardPage.addEventListener('click', () => {
    window.location.href = 'dashboard.html'
})

bookPage.addEventListener('click', () => {
    window.location.href = 'book.html'
})

addBookPage.addEventListener('click', () => {
    window.location.href = 'addBook.html'
})


