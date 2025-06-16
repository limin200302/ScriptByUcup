// Sticky header on scroll
window.addEventListener('scroll', function() {
  const header = document.querySelector('.main-header');
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Optional: Notification popup simulation
function showNotification(msg) {
  const notif = document.createElement('div');
  notif.textContent = msg;
  notif.style.position = 'fixed';
  notif.style.bottom = '20px';
  notif.style.right = '20px';
  notif.style.background = '#ffcc00';
  notif.style.color = '#1e1e2f';
  notif.style.padding = '10px 15px';
  notif.style.borderRadius = '8px';
  notif.style.boxShadow = '0 4px 10px rgba(0,0,0,0.3)';
  notif.style.fontWeight = 'bold';
  document.body.appendChild(notif);

  setTimeout(() => {
    notif.remove();
  }, 3000);
}

// Contoh pemanggilan otomatis setelah 5 detik
setTimeout(() => {
  showNotification('Seseorang baru saja top up 8Ball Pool!');
}, 5000);
