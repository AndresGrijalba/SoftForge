const ingresarBtn = document.getElementById('ingresar-btn');
const panel = document.getElementById('panel');
const organizacionBtn = document.getElementById('organizacion-btn');
const menuSuperpuesto = document.getElementById('menu-superpuesto');
const cerrarMenu = document.getElementById('cerrar-menu');

ingresarBtn.addEventListener('click', () => {
  if (panel.style.display === 'none' || panel.style.display === '') {
    panel.style.display = 'block';
  } else {
    panel.style.display = 'none';
  }
});

// Mostrar el menú superpuesto
organizacionBtn.addEventListener('click', () => {
  menuSuperpuesto.style.display = 'flex';
});

cerrarMenu.addEventListener('click', () => {
  const menuSuperpuesto = document.getElementById('menu-superpuesto');
  menuSuperpuesto.style.display = 'none';
});

// Manejar el formulario (opcional)
const formOrganizacion = document.getElementById('form-organizacion');
formOrganizacion.addEventListener('submit', (event) => {
  event.preventDefault();
  alert('Formulario enviado.');
  menuSuperpuesto.style.display = 'none';
});