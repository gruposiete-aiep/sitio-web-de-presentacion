/**
 * script.js — PixelForge Agency
 *
 * Funcionalidades:
 *  1. Año dinámico en el footer
 *  2. Galería de proyectos: mostrar detalle al hacer clic
 *  3. Validación del formulario de contacto
 */

/* ----------------------------------------------------------
   1. AÑO DINÁMICO EN EL FOOTER
   ---------------------------------------------------------- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ----------------------------------------------------------
   2. GALERÍA DE PROYECTOS
   ---------------------------------------------------------- */

// Datos de cada proyecto
var proyectos = [
  {
    titulo: "E-Commerce",
    descripcion: "Tienda online con listado de productos, carrito de compras y formulario de pago.",
    tecnologias: "Ideal para: Retail, Emprendedores, Catálogos de productos."
  },
  {
    titulo: "Landing Page",
    descripcion: "Página de presentación para una startup, con sección de precios y formulario de contacto.",
    tecnologias: "Ideal para: Agencias, Consultoras, Lanzamientos de marca." 
  },
  {
    titulo: "Dashboard",
    descripcion: "Panel de métricas con tablas de datos y filtros interactivos para visualizar estadísticas.",
    tecnologias: "Ideal para: Administración interna, Análisis de métricas, Inventarios."
  }
];

var gallery       = document.getElementById('gallery');
var detail        = document.getElementById('galleryDetail');
var detailTitle   = document.getElementById('detailTitle');
var detailDesc    = document.getElementById('detailDesc');
var detailTech    = document.getElementById('detailTech');
var closeBtn      = document.getElementById('galleryClose');

// Agregar evento de clic a cada miniatura
var items = gallery.querySelectorAll('.gallery__item');

for (var i = 0; i < items.length; i++) {
  items[i].addEventListener('click', function() {
    var index = parseInt(this.getAttribute('data-index'));
    var proyecto = proyectos[index];

    // Rellenar el panel con los datos del proyecto seleccionado
    detailTitle.textContent = proyecto.titulo;
    detailDesc.textContent  = proyecto.descripcion;
    detailTech.textContent  = proyecto.tecnologias;

    // Mostrar el panel de detalle
    detail.style.display = 'block';
  });
}

// Botón cerrar: ocultar el panel de detalle
closeBtn.addEventListener('click', function() {
  detail.style.display = 'none';
});

/* ----------------------------------------------------------
   3. VALIDACIÓN DEL FORMULARIO
   ---------------------------------------------------------- */
var form = document.getElementById('contactForm');

form.addEventListener('submit', function(event) {
  event.preventDefault(); // Evitar recarga de la página

  // Limpiar errores anteriores
  limpiarErrores();

  var nombre   = document.getElementById('nombre');
  var email    = document.getElementById('email');
  var servicio = document.getElementById('servicio');
  var mensaje  = document.getElementById('mensaje');

  var valido = true;

  // Validar nombre
  if (nombre.value.trim() === '') {
    mostrarError(nombre, 'error-nombre', 'El nombre es obligatorio.');
    valido = false;
  } else if (nombre.value.trim().length < 3) {
    mostrarError(nombre, 'error-nombre', 'El nombre debe tener al menos 3 caracteres.');
    valido = false;
  }

  // Validar email
  if (email.value.trim() === '') {
    mostrarError(email, 'error-email', 'El correo electrónico es obligatorio.');
    valido = false;
  } else if (!emailValido(email.value.trim())) {
    mostrarError(email, 'error-email', 'Ingresa un correo electrónico válido.');
    valido = false;
  }

  // Validar servicio
  if (servicio.value === '') {
    mostrarError(servicio, 'error-servicio', 'Selecciona un servicio.');
    valido = false;
  }

  // Validar mensaje
  if (mensaje.value.trim() === '') {
    mostrarError(mensaje, 'error-mensaje', 'El mensaje es obligatorio.');
    valido = false;
  } else if (mensaje.value.trim().length < 20) {
    mostrarError(mensaje, 'error-mensaje', 'El mensaje debe tener al menos 20 caracteres.');
    valido = false;
  }

  // Si todo está correcto, simular envío
  if (valido) {
    simularEnvio();
  }
});

// Verifica si el formato del email es válido
function emailValido(correo) {
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(correo);
}

// Muestra un mensaje de error en el campo indicado
function mostrarError(campo, errorId, mensaje) {
  campo.classList.add('invalid');
  document.getElementById(errorId).textContent = mensaje;
}

// Limpia todos los errores del formulario
function limpiarErrores() {
  var invalidos = form.querySelectorAll('.invalid');
  for (var i = 0; i < invalidos.length; i++) {
    invalidos[i].classList.remove('invalid');
  }
  var errores = form.querySelectorAll('.form-error');
  for (var i = 0; i < errores.length; i++) {
    errores[i].textContent = '';
  }
  var toast = document.getElementById('formToast');
  toast.textContent = '';
  toast.className = 'form-toast';
}

// Simula el envío del formulario y muestra mensaje de éxito
function simularEnvio() {
  var btn   = document.getElementById('submitBtn');
  var toast = document.getElementById('formToast');

  btn.disabled    = true;
  btn.textContent = 'Enviando...';

  setTimeout(function() {
    toast.textContent = '¡Mensaje enviado! Te contactaremos pronto.';
    toast.className   = 'form-toast success';

    form.reset();
    btn.disabled    = false;
    btn.textContent = 'Enviar mensaje';

    // Ocultar el mensaje después de 5 segundos
    setTimeout(function() {
      toast.textContent = '';
      toast.className   = 'form-toast';
    }, 5000);
  }, 1000);
}
