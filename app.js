const API_URL = 'http://127.0.0.1:5000/organizaciones'; 


document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault(); 
    const nombre = document.getElementById('org-name').value.trim();
    const correo = document.getElementById('rep-email').value.trim();
    const contraseña = document.getElementById('password').value.trim();
    const confirmarContraseña = document.getElementById('confirm-password').value.trim();

    if (contraseña !== confirmarContraseña) {
        alert('Las contraseñas no coinciden. Por favor, intente nuevamente.');
        return; 
    }
    if (!nombre || !correo || !contraseña || !confirmarContraseña) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    const data = {
        nombre,
        correo,
        contraseña,
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.mensaje); 
            document.querySelector('form').reset();
        } else {
            alert('Error: ' + result.error);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Ocurrió un error al registrar la organización.');
    }
});

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
