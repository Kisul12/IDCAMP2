document.addEventListener('DOMContentLoaded', () => {
    // Ambil data buku yang dipilih dari localStorage
    const selectedBook = JSON.parse(localStorage.getItem('selectedBook'));

    if (selectedBook) {
        // Tampilkan data buku ke halaman
        document.getElementById('gambarBuku').src = '/assets/book.png';
        document.getElementById('judulBuku').textContent = selectedBook.judul;
        document.getElementById('penulisBuku').textContent = `Penulis: ${selectedBook.penulis}`;
        document.getElementById('tahunTerbitBuku').textContent = `Tahun Terbit: ${selectedBook.tahunTerbit}`;
        document.getElementById('deskripsiBuku').textContent = `Deskripsi: ${selectedBook.deskripsi}`;
    } else {
        window.location.href = 'book.html';
    }

    // Jika selesai baca di klik
    document.getElementById('selesai').addEventListener('click', () => {
        if (selectedBook) {
            markBookAsFinished(selectedBook);
        }
    });

    // Jika kembali di klik
    document.querySelector('.button-container button').addEventListener('click', () => {
        window.location.href = 'book.html';
    });
});

// Fungsi untuk memindahkan buku ke daftar selesai dibaca
function markBookAsFinished(book) {
    // Ambil daftar buku dari localStorage
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const finishedBooks = JSON.parse(localStorage.getItem('finishedBooks')) || [];

    // Hapus buku dari daftar buku saat ini
    const updatedBooks = books.filter(b => b.judul !== book.judul);

    finishedBooks.push(book);

    // Simpan kembali data ke localStorage
    localStorage.setItem('books', JSON.stringify(updatedBooks));
    localStorage.setItem('finishedBooks', JSON.stringify(finishedBooks));

    alert(`Buku "${book.judul}" telah selesai dibaca!`);

    window.location.href = 'book.html';
}
