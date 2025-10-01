document.addEventListener('DOMContentLoaded', function() {

    // --- BAGIAN 1: PENGATURAN AWAL & REFERENSI ELEMEN ---
    const music = document.getElementById('background-music');
    const startButton = document.getElementById('start-journey-button');
    const typedTitle = document.getElementById('typed-title');
    const floatingPhotos = document.querySelectorAll('.floating-photo');
    const storyContainer = document.getElementById('story');
    const storyBlocks = document.querySelectorAll('.animate-on-scroll');
    const particleCanvas = document.getElementById('particle-canvas');
    const body = document.body;

    // --- BAGIAN 2: FUNGSI-FUNGSI UTAMA ---

    /**
     * Fungsi untuk animasi teks ketik pada judul utama.
     */
    function startTypingEffect() {
        const titleText = "Untukmu, Bintangku.";
        let i = 0;
        typedTitle.innerHTML = '';
        function typeWriter() {
            if (i < titleText.length) {
                typedTitle.innerHTML += titleText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        typeWriter();
    }

    /**
     * Fungsi utama yang dijalankan saat tombol "Jelajahi Cerita Kita" ditekan.
     */
    function startJourney() {
        // 1. Putar musik
        music.play().catch(error => {
            console.error("Gagal memutar musik:", error);
        });

        // 2. Aktifkan kembali scroll
        body.classList.remove('no-scroll');

        // 3. Scroll otomatis ke bagian cerita
        storyContainer.scrollIntoView({
            behavior: 'smooth'
        });

        // 4. Jalankan animasi partikel
        initParticles();
        
        // 5. Sembunyikan tombol setelah diklik agar tidak mengganggu
        startButton.style.display = 'none';
    }

    /**
     * Menampilkan foto-foto yang melayang di halaman depan.
     */
    function showFloatingPhotos() {
        floatingPhotos.forEach((photo, index) => {
            setTimeout(() => {
                photo.classList.add('visible');
            }, 500 + (index * 400));
        });
    }

    /**
     * Pengaturan Intersection Observer untuk animasi blok cerita saat scroll.
     */
    function setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                } else {
                    entry.target.classList.remove('is-visible');
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: "0px 0px -50px 0px"
        });
        storyBlocks.forEach(block => observer.observe(block));
    }

    /**
     * Pengaturan Lightbox untuk memperbesar gambar.
     */
    function setupLightbox() {
        const modal = document.getElementById('lightbox-modal');
        const modalImg = document.getElementById('lightbox-image');
        const allImages = document.querySelectorAll('.story-image-wrapper, .story-image-full');
        const closeBtn = document.querySelector('.close-button');

        allImages.forEach(imageContainer => {
            imageContainer.addEventListener('click', () => {
                const imgSrc = imageContainer.querySelector('img').src;
                modal.style.display = 'block';
                modalImg.src = imgSrc;
            });
        });
        function closeModal() { modal.style.display = 'none'; }
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (event) => {
            if (event.target === modal) { closeModal(); }
        });
    }

    /**
     * Fungsi untuk membuat dan menganimasikan partikel di latar belakang.
     */
    function initParticles() {
        for (let i = 0; i < 40; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particleCanvas.appendChild(particle);
            const size = Math.random() * 5 + 2;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = Math.random() * 10 + 10;
            const delay = Math.random() * 5;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${x}vw`;
            particle.style.top = `${y}vh`;
            particle.style.animation = `floatUp ${duration}s linear ${delay}s infinite`;
        }
    }
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        @keyframes floatUp {
            from { transform: translateY(0) rotate(0deg); opacity: 1; }
            to { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(styleSheet);

    // --- BAGIAN 3: MENJALANKAN FUNGSI DAN EVENT LISTENER ---
    startTypingEffect();
    showFloatingPhotos();
    setupScrollAnimations();
    setupLightbox();
    startButton.addEventListener('click', startJourney);
});