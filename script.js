// Audio setup dengan autoplay
const birthdayAudio = document.getElementById("birthdayAudio");
let audioPlaying = false;

// Setup untuk autoplay dengan volume rendah
function setupAudio() {
  birthdayAudio.volume = 0.2; // Volume rendah agar tidak mengagetkan
  birthdayAudio.loop = true;

  // Coba play audio (browser mungkin block autoplay tanpa interaksi)
  const playPromise = birthdayAudio.play();

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        audioPlaying = true;
        console.log("🎵 Audio berjalan otomatis");
      })
      .catch((error) => {
        console.log("Autoplay mungkin diblokir:", error);
        // Simpan status bahwa audio belum play
        audioPlaying = false;
      });
  }
}

// Panggil setup audio saat halaman dimuat
window.addEventListener("load", setupAudio);

// Confetti canvas setup
const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Confetti particles
let confettiParticles = [];
let confettiActive = false;

// Confetti colors
const confettiColors = [
  "#FF8C42",
  "#FFB347",
  "#FFD166",
  "#FF7EB3",
  "#42C5FF",
  "#7AFCFF",
  "#C5A3FF",
  "#87F5A5",
];

// State untuk toggle ucapan
let isMessageOpen = false;
const originalMessage =
  "Semoga di hari spesial ini kamu dikelilingi banyak hal baik yaa, kebahagiaan yang gada habisnyaa, dan momen kecil yang bikin hati tenang. Semoga semua harapan pelan-pelan ketemu jalannya, dan hal baik di hari ini bisa kamu simpan lama-lamaaa 🤍";

// DOM Elements
const initialScreen = document.getElementById("initialScreen");
const mainContent = document.getElementById("mainContent");
const userNameInput = document.getElementById("userName");
const startBtn = document.getElementById("startBtn");
const personalizedGreeting = document.getElementById("personalizedGreeting");

// Fungsi untuk memulai kejutan
function startSurprise() {
  const userName = userNameInput.value.trim();

  if (!userName) {
    // Tambahkan efek shake jika input kosong
    userNameInput.style.animation = "shake 0.5s ease";
    setTimeout(() => {
      userNameInput.style.animation = "";
    }, 500);
    return;
  }

  // Tambahkan nama ke greeting
  personalizedGreeting.innerHTML = `${userName} 🎉 🎂 🎈`;

  // Sembunyikan layar awal, tampilkan konten utama
  initialScreen.style.opacity = "0";
  initialScreen.style.transform = "scale(0.9)";

  setTimeout(() => {
    initialScreen.style.display = "none";
    mainContent.style.display = "block";

    // Tambahkan efek transisi
    mainContent.style.opacity = "0";
    mainContent.style.transform = "scale(0.95)";

    setTimeout(() => {
      mainContent.style.opacity = "1";
      mainContent.style.transform = "scale(1)";
      mainContent.style.transition = "all 0.5s ease";
    }, 50);

    // Coba play audio lagi jika belum berjalan
    if (!audioPlaying) {
      birthdayAudio
        .play()
        .then(() => {
          audioPlaying = true;
        })
        .catch((error) => {
          console.log("Audio akan play setelah interaksi");
        });
    }

    // Mulai animasi elemen mengambang
    animateFloatingElements();
  }, 500);
}

// Validasi input nama
userNameInput.addEventListener("input", function () {
  if (this.value.trim().length > 0) {
    startBtn.disabled = false;
  } else {
    startBtn.disabled = true;
  }
});

// Event listener untuk tombol start
startBtn.addEventListener("click", startSurprise);

// Event listener untuk tekan Enter di input
userNameInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter" && !startBtn.disabled) {
    startSurprise();
  }
});

// Floating elements animation
function animateFloatingElements() {
  const floatingIcons = document.querySelectorAll(".floating-icon");
  floatingIcons.forEach((icon) => {
    icon.style.animationDuration = `${Math.random() * 20 + 15}s`;
  });
}

// Fungsi untuk membuka/tutup ucapan
function toggleMessage() {
  const message = document.getElementById("message");
  const messageBtn = document.getElementById("messageBtn");
  const messageContainer = document.querySelector(".message-container");

  // Animasi transisi
  messageContainer.style.transform = "scale(0.95)";
  message.style.opacity = "0.5";

  setTimeout(() => {
    if (!isMessageOpen) {
      // Buka ucapan (tampilkan pesan lengkap)
      message.innerHTML = `
                <span style="font-size: 1.8rem; font-weight: bold; color: #ff8c42; display: block; margin-bottom: 15px; font-family: 'Caveat', cursive;">
                    Untuk seseorang yang sangat amat keren,
                </span>
                
                Di hari ulang tahun kamu ini, semoga semua mimpi yang kamu simpan pelan-pelan jadi .
                Semoga setiap usaha yang kamu jalanin berbuah manis, dan tiap langkah kecilmu selalu ketemu sama hal-hal baik.<br><br>
                
                Tetaplah bersinar dengan caramu sendiri,
                tetaplah tersenyum walopun kadang cape,
                dan tetap jadi pribadi hangat yang tanpa sadar selalu bikin sekitar merasa nyamannn.<br><br>
                
                Semoga tahun ini ngasih kamu lebih banyak alasan buat bahagia,
                lebih banyak kesempatan buat tumbuh,
                dan lebih banyak momen yang bikin kamu bangga sama diri kamu sendiri...<br><br>
                
                <span style="font-family: 'Caveat', cursive; font-size: 1.9rem; color: #ff8c42;">
                Selamat ulang tahun!<br>
                Semoga panjang umur dan selalu dalam kebahagiaan yaaa. ❤️
                </span>
            `;

      // Update tombol
      messageBtn.innerHTML = '<i class="fas fa-times-circle"></i> Tutup Ucapan';
      isMessageOpen = true;

      // Start celebration
      startCelebration();

      // Pastikan audio berjalan
      if (!audioPlaying) {
        birthdayAudio.play().then(() => {
          audioPlaying = true;
        });
      }
    } else {
      // Tutup ucapan (kembali ke pesan singkat)
      message.innerHTML = originalMessage;

      // Update tombol
      messageBtn.innerHTML = '<i class="fas fa-gift"></i> Buka Ucapan Disini';
      isMessageOpen = false;
    }

    // Animasi kembali
    messageContainer.style.transform = "scale(1)";
    message.style.opacity = "1";
  }, 300);
}

// Start celebration with confetti
function startCelebration() {
  if (!confettiActive) {
    confettiActive = true;
    createConfetti();
    animateConfetti();

    // Add some extra visual effects
    const card = document.querySelector(".card");
    card.style.animation = "celebrate 0.5s ease 3";

    // Create celebration style
    const style = document.createElement("style");
    style.innerHTML = `
            @keyframes celebrate {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.03); }
            }
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
        `;
    document.head.appendChild(style);
  }
}

// Create confetti particles
function createConfetti() {
  confettiParticles = [];
  const particleCount = 200;

  for (let i = 0; i < particleCount; i++) {
    confettiParticles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 10 + 5,
      speed: Math.random() * 3 + 2,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      shape: Math.random() > 0.5 ? "circle" : "rectangle",
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 10 - 5,
      sway: Math.random() * 2 - 1,
    });
  }
}

// Animate confetti
function animateConfetti() {
  if (!confettiActive) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confettiParticles.forEach((particle) => {
    // Update position
    particle.y += particle.speed;
    particle.x += particle.sway;
    particle.rotation += particle.rotationSpeed;

    // If particle goes off screen, reset it
    if (particle.y > canvas.height) {
      particle.y = -particle.size;
      particle.x = Math.random() * canvas.width;
    }

    if (particle.x > canvas.width + particle.size) {
      particle.x = -particle.size;
    } else if (particle.x < -particle.size) {
      particle.x = canvas.width + particle.size;
    }

    // Draw particle
    ctx.save();
    ctx.translate(particle.x, particle.y);
    ctx.rotate((particle.rotation * Math.PI) / 180);
    ctx.fillStyle = particle.color;

    if (particle.shape === "circle") {
      ctx.beginPath();
      ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillRect(
        -particle.size / 2,
        -particle.size / 2,
        particle.size,
        particle.size,
      );
    }

    ctx.restore();
  });

  requestAnimationFrame(animateConfetti);
}

// Toggle confetti on/off
function toggleConfetti() {
  const confettiBtn = document.getElementById("confettiBtn");

  if (confettiActive) {
    confettiActive = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiBtn.innerHTML =
      '<i class="fas fa-birthday-cake"></i> Hidupkan Bling-bling Lucu';
    confettiBtn.classList.remove("btn-secondary");
    confettiBtn.classList.add("btn-primary");
  } else {
    confettiActive = true;
    createConfetti();
    animateConfetti();
    confettiBtn.innerHTML =
      '<i class="fas fa-times"></i> Matikan Bling-bling Lucu';
    confettiBtn.classList.remove("btn-primary");
    confettiBtn.classList.add("btn-secondary");
  }
}

// Make audio playable on any click jika autoplay diblokir
document.addEventListener("click", function () {
  if (birthdayAudio.paused && !audioPlaying) {
    birthdayAudio.volume = 0.2;
    birthdayAudio.play().then(() => {
      audioPlaying = true;
    });
  }
});

// Handle window resize
window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Recreate confetti if active
  if (confettiActive) {
    createConfetti();
  }
});

// Initialize setelah halaman dimuat
window.addEventListener("load", function () {
  // Fokus ke input nama
  userNameInput.focus();

  // Add event listener untuk tombol pesan (di main content)
  const messageBtn = document.getElementById("messageBtn");
  if (messageBtn) {
    messageBtn.addEventListener("click", toggleMessage);
  }

  // Add event listener untuk tombol konfeti
  const confettiBtn = document.getElementById("confettiBtn");
  if (confettiBtn) {
    confettiBtn.addEventListener("click", toggleConfetti);
  }

  // Add a slight pulsing effect to the cake
  const cake = document.querySelector(".cake");
  if (cake) {
    setInterval(() => {
      cake.style.transform =
        cake.style.transform === "scale(1.05)" ? "scale(1)" : "scale(1.05)";
    }, 2000);
  }

  // Add hover effect to wish items
  const wishItems = document.querySelectorAll(".wish-item");
  wishItems.forEach((item) => {
    item.addEventListener("click", function () {
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 200);
    });
  });

  console.log("🎂 Selamat datang! Masukkan nama untuk melihat kejutan!");
});
