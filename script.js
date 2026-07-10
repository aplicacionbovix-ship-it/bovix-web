// ===== Carrusel del teléfono (hero) =====
const pantallas = [
  'assets/screens/captura-1.jpg',
  'assets/screens/captura-2.jpg',
  'assets/screens/captura-3.jpg',
  'assets/screens/captura-4.jpg',
  'assets/screens/captura-5.jpg',
  'assets/screens/captura-6.jpg',
  'assets/screens/captura-7.jpg',
  'assets/screens/captura-8.jpg',
  'assets/screens/captura-9.jpg'
];

const phoneImage = document.getElementById('phoneImage');
const contPuntos = document.getElementById('puntosCarrusel');
let indice = 0;

// Crear puntos indicadores
pantallas.forEach((_, n) => {
  const p = document.createElement('i');
  if (n === 0) p.classList.add('activo');
  contPuntos.appendChild(p);
});
const puntos = contPuntos.querySelectorAll('i');

// Precargar imágenes para que el cambio sea suave
pantallas.forEach(src => { const im = new Image(); im.src = src; });

function cambiarPantalla() {
  indice = (indice + 1) % pantallas.length;
  phoneImage.style.opacity = 0.15;
  setTimeout(() => {
    phoneImage.src = pantallas[indice];
    phoneImage.style.opacity = 1;
  }, 200);
  puntos.forEach((p, n) => p.classList.toggle('activo', n === indice));
}

// Respetar preferencia de menos movimiento
const menosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!menosMovimiento) {
  setInterval(cambiarPantalla, 3000);
}

// ===== Animaciones al hacer scroll =====
const observador = new IntersectionObserver(entradas => {
  entradas.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('show');
      observador.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observador.observe(el));

// ===== Menú móvil =====
function alternarMenu() {
  document.getElementById('menuPrincipal').classList.toggle('abierto');
}
document.querySelectorAll('#menuPrincipal a').forEach(a => {
  a.addEventListener('click', () => {
    document.getElementById('menuPrincipal').classList.remove('abierto');
  });
});
