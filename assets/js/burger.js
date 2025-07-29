// Burger menu mobile
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) {
    menu.classList.toggle('open');
    if (menu.classList.contains('open')) {
      menu.style.display = 'block';
      setTimeout(() => menu.style.opacity = '1', 10);
    } else {
      menu.style.opacity = '0';
      setTimeout(() => menu.style.display = 'none', 300);
    }
  }
}
function closeMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) {
    menu.classList.remove('open');
    menu.style.opacity = '0';
    setTimeout(() => menu.style.display = 'none', 300);
  }
}
// Initial state
window.addEventListener('DOMContentLoaded', function() {
  const menu = document.getElementById('mobile-menu');
  if (menu) {
    menu.style.display = 'none';
    menu.style.opacity = '0';
  }
});
