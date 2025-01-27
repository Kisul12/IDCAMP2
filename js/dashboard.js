const dashboardPage = document.getElementById('beranda-dashboard');
const bookPage = document.getElementById('buku');
const logout = document.getElementById('logout');

dashboardPage.addEventListener('click', () => {
    window.location.href = 'dashboard.html';
});

bookPage.addEventListener('click', () => {
    window.location.href = 'book.html';
});

logout.addEventListener('click', () => {
    const quit = confirm('yakin mau logout niih??');
    if (quit) {
        window.location.href = 'index.html';
    }
});

// Fungsi untuk mengambil data buku dari localStorage
function getBooksFromStorage() {
    return JSON.parse(localStorage.getItem('books')) || [];
}

// Fungsi untuk menyimpan data buku ke localStorage
function saveBooksToStorage(books) {
    localStorage.setItem('books', JSON.stringify(books));
}

function addBook(judul, penulis, tahunTerbit, deskripsi) {
    const books = getBooksFromStorage();
    books.push({
        judul: judul,
        penulis: penulis,
        tahunTerbit: tahunTerbit,
        deskripsi: deskripsi,
    });
    console.log(books);
    saveBooksToStorage(books);
    renderBook();
}

function deleteBook(judul) {
    // Hapus dari daftar buku
    const books = getBooksFromStorage();
    const updatedBooks = books.filter((buku) => buku.judul !== judul);

    // Hapus dari daftar buku selesai
    const finishedBooks = JSON.parse(localStorage.getItem('finishedBooks')) || [];
    const updatedFinishedBooks = finishedBooks.filter((buku) => buku.judul !== judul);
    localStorage.setItem('finishedBooks', JSON.stringify(updatedFinishedBooks));

    saveBooksToStorage(updatedBooks);
    renderBook();
}

function renderBook() {
    const books = getBooksFromStorage();
    const finishedBooks = JSON.parse(localStorage.getItem('finishedBooks')) || [];
    
    const bookContainer = document.getElementById('book-preview');
    const finishedBookContainer = document.getElementById('book-done');
    
    bookContainer.innerHTML = '';
    finishedBookContainer.innerHTML = '';

    // Tampilkan daftar buku belum selesai
    books.forEach((buku) => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item');
        bookItem.innerHTML = `
        <img src="/assets/book.png" alt="Buku">
        <h4>${buku.judul}</h4>
        <p>${buku.penulis}</p>
        <p>${buku.tahunTerbit}</p>
        <p>${buku.deskripsi}</p>
        <button class="read" id="read" data-testid="readButton">Baca</button>
        <button class="delete" id="delete" onclick="deleteBook('${buku.judul}')" data-testid="deleteButton">Hapus</button>
        `;
        bookItem.querySelector('.read').addEventListener('click', () => {
            localStorage.setItem('selectedBook', JSON.stringify(buku));
            window.location.href = 'readBook.html';
        });
        bookContainer.appendChild(bookItem);
    });

    // Tampilkan daftar buku selesai dibaca
    finishedBooks.forEach((buku) => {
        const finishedBookItem = document.createElement('div');
        finishedBookItem.classList.add('book-item');
        finishedBookItem.innerHTML = `
        <img src="/assets/book.png" alt="Buku">
        <h4>${buku.judul}</h4>
        <p>${buku.penulis}</p>
        <p>${buku.tahunTerbit}</p>
        <p>${buku.deskripsi}</p>
        <button class="read" id="read" onClick="markAsUnfinished('${buku.judul}')" data-testid="unfinishButton">Tandai belum selesai</button>
        <button class="delete" id="delete" onclick="deleteBook('${buku.judul}')" data-testid="deleteButton">Hapus</button>
        `;
        finishedBookContainer.appendChild(finishedBookItem);
    });
}

// Fungsi untuk memindahkan buku ke daftar belum selesai dibaca
function markAsUnfinished(judul) {
    // Ambil daftar buku selesai dibaca dari localStorage
    const finishedBooks = JSON.parse(localStorage.getItem('finishedBooks')) || [];
    const books = getBooksFromStorage();

    // Cari buku yang akan dipindahkan ke daftar belum selesai
    const bookToUnfinish = finishedBooks.find(b => b.judul === judul);

    if (bookToUnfinish) {
        // Tambahkan buku ke daftar belum selesai
        books.push(bookToUnfinish);
        saveBooksToStorage(books);

        // Hapus buku dari daftar selesai dibaca
        const updatedFinishedBooks = finishedBooks.filter(b => b.judul !== judul);
        localStorage.setItem('finishedBooks', JSON.stringify(updatedFinishedBooks));
    }

    // Render ulang daftar buku
    renderBook();
}


// Form Buku di Submit
const addBookForm = document.getElementById('addBookForm');
addBookForm.addEventListener('submit', (event) => {
    event.preventDefault(); 
    const judul = document.getElementById('judul').value;
    const penulis = document.getElementById('penulis').value;
    const tahunTerbit = document.getElementById('tahunTerbit').value;
    const deskripsi = document.getElementById('deskripsi').value;

    addBook(judul, penulis, tahunTerbit, deskripsi);

    addBookForm.reset();
});

document.addEventListener('DOMContentLoaded', () => {
    renderBook();
});