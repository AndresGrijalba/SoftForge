const API_URL_LOGIN = 'http://127.0.0.1:5000/login';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Evitar recargar la página

            // Obtener los valores del formulario de inicio de sesión
            const correo = document.getElementById('login-email').value.trim();
            const contraseña = document.getElementById('login-password').value.trim();

            // Validar que los campos no estén vacíos
            if (!correo || !contraseña) {
                alert('Por favor, complete todos los campos.');
                return;
            }

            // Preparar los datos para enviar
            const data = { correo, contraseña };

            try {
                // Enviar los datos al backend
                const response = await fetch('http://127.0.0.1:5000/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });

                // Manejar la respuesta
                const result = await response.json();
                if (response.ok) {
                    alert(result.mensaje); // Mostrar mensaje de éxito

                    // Redirigir a la página dashboard.html
                    window.location.href = 'dashboard.html';
                } else {
                    alert('Error: ' + result.error); // Mostrar error del backend
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
                alert('Ocurrió un error al intentar iniciar sesión.');
            }
        });
    } else {
        console.error('No se encontró el formulario con id "loginForm".');
    }
});