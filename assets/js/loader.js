window.addEventListener('load', function() {
  const loader = document.getElementById('minimal-loader');
  if(loader) {
    loader.style.opacity = '0';
    setTimeout(() => loader.style.display = 'none', 500);
  }
});
