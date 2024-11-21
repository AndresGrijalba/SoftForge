document.addEventListener('DOMContentLoaded', () => {
    const buscador = document.getElementById('buscador');
    const container = document.getElementById('organizationCards');
    const modal = document.getElementById('donarModal');
    const closeModal = document.getElementById('closeModal');
    const donationForm = document.getElementById('donationForm');
    let organizaciones = []; // Mantendrá los datos de las organizaciones cargadas

    // Cargar organizaciones desde el backend
    const cargarOrganizaciones = async () => {
        try {
            const response = await fetch('http://localhost:5000/organizaciones');
            organizaciones = await response.json();

            if (response.ok) {
                // Limpiar contenedor
                container.innerHTML = '';
                // Generar tarjetas dinámicamente
                organizaciones.forEach(org => {
                    const card = document.createElement('div');
                    card.className = 'organization card';
                    card.innerHTML = `
                        <h2>${org.nombre}</h2>
                        <p>Descripción: ${org.descripcion}</p>
                        <p>Por recaudar: <span class="amount">$${org.recaudado}</span></p>
                        <p>País: ${org.pais}</p>
                        <button class="btn-donar" data-id="${org.id}" data-nombre="${org.nombre}">Donar</button>
                    `;
                    container.appendChild(card);
                });
            } else {
                container.innerHTML = `<p>No se pudieron cargar las organizaciones.</p>`;
            }
        } catch (error) {
            console.error('Error al obtener las organizaciones:', error);
            container.innerHTML = `<p>Error al cargar las organizaciones. Intente nuevamente más tarde.</p>`;
        }
    };

    // Cargar las organizaciones al inicio
    cargarOrganizaciones();

    // Implementar buscador
    buscador.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();

        const organizationCards = container.querySelectorAll('.organization');
        organizationCards.forEach(org => {
            const orgText = org.textContent.toLowerCase();
            if (orgText.includes(query)) {
                org.style.display = 'block'; // Mostrar la organización
            } else {
                org.style.display = 'none'; // Ocultar la organización
            }
        });
    });

    // Event listener para botones "Donar"
    container.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-donar')) {
            const orgId = event.target.dataset.id;
            const orgName = event.target.dataset.nombre;

            console.log(event.target.dataset.id)

            // Mostrar modal y setear datos
            modal.style.display = 'block';
            donationForm.dataset.orgId = orgId;
            donationForm.dataset.orgName = orgName;
        }
    });

    // Cerrar modal al hacer clic en "X"
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Manejar envío del formulario de donación
    donationForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const monto = document.getElementById('monto').value;
        const medio = document.getElementById('medio').value;
        const orgId = donationForm.dataset.orgId;

        try {
            const response = await fetch('http://localhost:5000/donar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ monto, medio, organizacion_id: orgId }),
            });

            if (response.ok) {
                alert(`Donación realizada exitosamente:\nMonto: $${monto}\nMedio de Pago: ${medio}`);
                modal.style.display = 'none';
                cargarOrganizaciones(); // Actualizar recaudado
            } else {
                const error = await response.json();
                alert(`Error al realizar la donación: ${error.message}`);
            }
        } catch (error) {
            console.error('Error al enviar la donación:', error);
            alert('Error al procesar la donación. Intente nuevamente más tarde.');
        }
    });

    document.getElementById('donationForm').addEventListener('submit', async (event) => {
        event.preventDefault();
    
        const recaudacionId = event.target.getAttribute('data-id'); // ID de la recaudación asociada
        const monto = document.getElementById('monto').value; // Monto ingresado
        const medioPago = document.getElementById('medio').value; // Medio de pago seleccionado
    
        try {
            const response = await fetch('http://127.0.0.1:5000/guardar_donacion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    recaudacion_id: recaudacionId,
                    monto: monto,
                    medio_pago: medioPago,
                }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                alert('Donación guardada exitosamente.');
                // Recargar la página o realizar otra acción después de la donación
                window.location.reload();
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error('Error al guardar la donación:', error);
            alert('Error al procesar la donación. Intenta nuevamente.');
        }
    });
    
});
