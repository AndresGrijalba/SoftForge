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

    const map = L.map('map').setView([20.5937, -100.3899], 5); // Coordenadas iniciales

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
    }).addTo(map);

    // Marcadores de ejemplo
    const organizacionesData = [
        { name: "Organización 1", coords: [19.4326, -99.1332] }, // CDMX
        { name: "Organización 2", coords: [6.2442, -75.5812] },  // Medellín
    ];

    organizacionesData.forEach(org => {
        L.marker(org.coords)
            .addTo(map)
            .bindPopup(`<b>${org.name}</b>`)
            .openPopup();
    });

    function initMap() {
        const location = { lat: -34.397, lng: 150.644 }; // Coordenadas iniciales
        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 8,
            center: location,
        });
    
        new google.maps.Marker({
            position: location,
            map: map,
        });
    }
    

});

