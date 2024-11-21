document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); 
    const correo = document.getElementById('login-email').value;
    const contraseña = document.getElementById('login-password').value;

    try {
        
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ correo, contraseña }), 
        });

        if (response.ok) {
            const data = await response.json();
            alert(`Login exitoso, bienvenido ${data.nombre}`);
            window.location.href = 'panelorg.html'; 
        } else {
            const errorData = await response.json();
            alert(errorData.error || 'Error al iniciar sesión');
        }
    } catch (error) {

        alert('No se pudo conectar con el servidor');
    }
});
