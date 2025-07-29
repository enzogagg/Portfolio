// Burger menu mobile
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const burger = document.querySelector('.burger-menu');
  if (menu) {
    menu.classList.toggle('active');
    if (burger) burger.classList.toggle('active');
    if (menu.classList.contains('active')) {
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
  const burger = document.querySelector('.burger-menu');
  if (menu) {
    menu.classList.remove('active');
    if (burger) burger.classList.remove('active');
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
