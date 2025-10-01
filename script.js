document.addEventListener('DOMContentLoaded', function() {

    const music = document.getElementById('background-music');
    const startButton = document.getElementById('start-journey-button');
    const heroSection = document.querySelector('.hero-section');
    const typedTitle = document.getElementById('typed-title');
    const floatingPhotos = document.querySelectorAll('.floating-photo');

    // --- 1. Animasi Teks Ketik di Halaman Depan ---
    const titleText = "Untukmu, Bintangku."; // Ganti teks judul di sini
    let i = 0;
    function typeWriter() {
        if (i < titleText.length) {
            typedTitle.innerHTML += titleText.charAt(i);
            i++;
            setTimeout(typeWriter, 100); // Kecepatan ketikan
        }
    }
    
    // Panggil typewriter segera setelah DOMContentLoaded
    typeWriter();

    // --- 2. Memulai Musik & Cerita dari Halaman Depan ---
    startButton.addEventListener('click', () => {
        music.play().catch(error => console.log("Interaksi pengguna dibutuhkan untuk memutar audio."));
        
        // Animasi fade out hero section
        heroSection.style.opacity = '0';
        heroSection.style.transition = 'opacity 1s ease-out';
        
        setTimeout(() => {
            heroSection.style.display = 'none';
            // Scroll ke bagian cerita setelah hero section hilang
            document.getElementById('story').scrollIntoView({ behavior: 'smooth' });
        }, 1000); // Sesuaikan dengan durasi transisi

        // Mulai animasi partikel latar belakang setelah tombol diklik
        initParticles();
    });

    // --- 3. Animasi Foto Melayang di Halaman Depan ---
    floatingPhotos.forEach((photo, index) => {
        // Atur posisi awal acak di sekitar hero section
        photo.style.top = Math.random() * 80 + 10 + 'vh'; // 10% to 90%
        photo.style.left = Math.random() * 80 + 10 + 'vw'; // 10% to 90%
        
        // Atur rotasi awal acak
        const initialRotation = Math.random() * 30 - 15; // -15deg to +15deg
        photo.style.setProperty('--initial-rotation', `${initialRotation}deg`);
        
        // Jadikan foto terlihat setelah beberapa detik
        setTimeout(() => {
            photo.classList.add('visible');
        }, 1000 + (index * 300)); // Delay setiap foto
    });


    // --- 4. Animasi Scroll-Reveal untuk Blok Cerita ---
    const storyBlocks = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Hentikan observasi setelah terlihat
            }
        });
    }, {
        threshold: 0.2, // Elemen dianggap terlihat jika 20% masuk viewport
        rootMargin: '0px 0px -10% 0px' // Mulai animasi sedikit lebih awal
    });

    storyBlocks.forEach(block => {
        observer.observe(block);
    });

    // --- 5. Fungsi Lightbox (Modal Gambar) ---
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-image');
    const allImages = document.querySelectorAll('.story-image-wrapper img, .story-image-full img'); // Pilih semua gambar cerita
    const closeBtn = document.querySelector('.close-button');

    allImages.forEach(img => {
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

    // --- 6. Animasi Partikel di Latar Belakang (Lebih Canggih) ---
    const particleCanvas = document.getElementById('particle-canvas');
    let particles = [];
    const numParticles = 50;

    function initParticles() {
        for (let i = 0; i < numParticles; i++) {
            createParticle();
        }
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particleCanvas.appendChild(particle);

        // Gaya acak
        const size = Math.random() * 4 + 2; // 2-6px
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 75%)`; // Warna acak
        particle.style.borderRadius = '50%'; // Lingkaran
        particle.style.position = 'absolute';
        particle.style.opacity = Math.random() * 0.7 + 0.3;
        particle.style.boxShadow = `0 0 ${size/2}px ${size/3}px var(--light-accent-color)`;
        
        resetParticle(particle);

        particles.push(particle);
    }

    function resetParticle(particle) {
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = '100vh'; // Mulai dari bawah
        particle.style.animation = 'none'; // Reset animasi
        void particle.offsetWidth; // Trigger reflow
        
        // Animasi float ke atas dengan durasi acak
        const duration = Math.random() * 10 + 10; // 10-20s
        const delay = Math.random() * 5; // 0-5s
        const translateX = Math.random() * 200 - 100; // -100px to 100px
        const rotateZ = Math.random() * 720 - 360; // -360deg to 360deg

        particle.style.animation = `particleFloat ${duration}s linear ${delay}s infinite, 
                                     particleTwinkle ${Math.random() * 2 + 1}s infinite alternate`;
        particle.style.setProperty('--translate-x', `${translateX}px`);
        particle.style.setProperty('--rotate-z', `${rotateZ}deg`);

        // Ketika animasi selesai, reset posisi untuk loop
        particle.addEventListener('animationiteration', () => {
            // Hanya reset jika bukan animasi twinkle
            if (particle.style.animationName.includes('particleFloat')) {
                resetParticle(particle);
            }
        });
    }

    // Keyframes untuk partikel (perlu ditambahkan ke CSS)
    // Saya letakkan di CSS untuk kemudahan

});