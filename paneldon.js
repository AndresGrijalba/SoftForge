document.addEventListener('DOMContentLoaded', () => {
    const buscador = document.getElementById('buscador');
    const organizaciones = document.querySelectorAll('.organization');

    buscador.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();

        organizaciones.forEach(org => {
            const orgText = org.textContent.toLowerCase();
            if (orgText.includes(query)) {
                org.style.display = 'block'; // Mostrar la organización
            } else {
                org.style.display = 'none'; // Ocultar la organización
            }
        });
    });
    
    // Selección de elementos
    const modal = document.getElementById('donarModal');
    const openModal = document.getElementById('donarBtn');
    const closeModal = document.getElementById('closeModal');
    const donationForm = document.getElementById('donationForm');

    // Abrir modal al hacer clic en "Donar"
    openModal.addEventListener('click', () => {
    modal.style.display = 'block';
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

    // Manejar envío del formulario
    donationForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const monto = document.getElementById('monto').value;
    const medio = document.getElementById('medio').value;

    alert(`Donación realizada:\nMonto: $${monto}\nMedio de Pago: ${medio}`);
    modal.style.display = 'none';
    });


});

