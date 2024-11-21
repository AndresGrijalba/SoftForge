document.getElementById('confirmar').addEventListener('click', async () => {
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const ubicacion = document.getElementById('ubicacion').value;
    const monto = document.getElementById('monto').value;

    if (!nombre || !descripcion || !ubicacion || !monto) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    const datos = {
        nombre,
        descripcion,
        ubicacion,
        monto: parseFloat(monto)
    };

    try {
        const response = await fetch('http://localhost:5000/recaudaciones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        const resultado = await response.json();
        if (response.ok) {
            alert('Recaudación registrada exitosamente');
            document.getElementById('recaudacionForm').reset();
        } else {
            alert(`Error: ${resultado.error}`);
        }
    } catch (error) {
        alert('Error al registrar la recaudación');
    }
});
