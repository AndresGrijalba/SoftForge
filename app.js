const API_URL = 'http://127.0.0.1:5000/organizaciones'; // URL del backend

// Función para manejar el registro de una organización
document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Evitar recargar la página

    // Obtener los valores del formulario
    const nombre = document.getElementById('org-name').value.trim();
    const correo = document.getElementById('rep-email').value.trim();
    const contraseña = document.getElementById('password').value.trim();
    const confirmarContraseña = document.getElementById('confirm-password').value.trim();

    // Validación: comprobar si las contraseñas coinciden
    if (contraseña !== confirmarContraseña) {
        alert('Las contraseñas no coinciden. Por favor, intente nuevamente.');
        return; // No enviar datos si las contraseñas no coinciden
    }

    // Validación: verificar que todos los campos estén completos
    if (!nombre || !correo || !contraseña || !confirmarContraseña) {
        alert('Por favor, complete todos los campos.');
        return; // No enviar datos si algún campo está vacío
    }

    // Preparar los datos para enviar
    const data = {
        nombre,
        correo,
        contraseña,
    };

    try {
        // Enviar datos al backend
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        // Manejar la respuesta
        const result = await response.json();
        if (response.ok) {
            alert(result.mensaje); // Mostrar mensaje de éxito
            document.querySelector('form').reset(); // Limpiar el formulario
        } else {
            alert('Error: ' + result.error); // Mostrar error del backend
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Ocurrió un error al registrar la organización.');
    }
});

// Función para cambiar de pestañas (Organización/Donante)
function showTab(tabId) {
    document.querySelectorAll('.form-container').forEach(form => {
        form.classList.remove('active');
    });

    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });

    document.getElementById(tabId).classList.add('active');

    document.querySelector(`.tab[onclick="showTab('${tabId}')"]`).classList.add('active');
}
