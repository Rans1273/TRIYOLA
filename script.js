document.addEventListener('DOMContentLoaded', function() {

    const music = document.getElementById('background-music');
    const startButton = document.getElementById('start-journey-button');
    const heroSection = document.querySelector('.hero-section');

    // 1. Memulai Musik & Cerita
    startButton.addEventListener('click', () => {
        music.play().catch(error => console.log("Interaksi pengguna dibutuhkan untuk memutar audio."));
        
        // Sembunyikan tombol dan scroll ke section cerita
        heroSection.style.opacity = '0';
        setTimeout(() => {
            heroSection.style.display = 'none';
        }, 1000);

        // Buat partikel hati mulai berjatuhan
        setInterval(createHeart, 300);
    });

    // 2. Animasi Scroll-Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 // elemen dianggap terlihat jika 10% areanya masuk viewport
    });

    const storyBlocks = document.querySelectorAll('.story-block');
    storyBlocks.forEach(block => observer.observe(block));

    // 3. Fungsi Lightbox (Modal Gambar)
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-image');
    const storyImages = document.querySelectorAll('.story-image img');
    const closeBtn = document.querySelector('.close-button');

    storyImages.forEach(img => {
        img.parentElement.addEventListener('click', () => {
            modal.style.display = 'block';
            modalImg.src = img.src;
        });
    });

    function closeModal() {
        modal.style.display = 'none';
    }

    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });

    // 4. Animasi Partikel Hati
    const heartsContainer = document.getElementById('hearts-container');
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '&#x2764;'; // Kode HTML untuk simbol hati
        
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 5 + 5 + 's'; // durasi antara 5-10 detik
        heart.style.opacity = Math.random();
        heart.style.fontSize = Math.random() * 10 + 10 + 'px'; // ukuran antara 10-20px

        heartsContainer.appendChild(heart);

        // Hapus elemen hati setelah animasinya selesai
        setTimeout(() => {
            heart.remove();
        }, 10000);
    }
});