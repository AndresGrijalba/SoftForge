document.getElementById('generarCertificado').addEventListener('click', () => {
    const nombre = document.getElementById('nombre').value;

    if (!nombre) {
        alert('Por favor, ingresa tu nombre');
        return;
    }

    const fechaActual = new Date().toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const certificadoHTML = `
        <div class="certificate" id="certificado">
            <h1>Certificado de Donación</h1>
            <p>Se otorga el presente certificado a</p>
            <h2>${nombre}</h2>
            <p>Por su valiosa contribución realizada el</p>
            <h3>${fechaActual}</h3>
        </div>
    `;

    document.getElementById('certificadoContainer').innerHTML = certificadoHTML;

    const certificadoElement = document.getElementById('certificado');
    html2canvas(certificadoElement).then(canvas => {
        const certificadoImg = canvas.toDataURL("image/png");

        const downloadLink = document.getElementById('descargarCertificado');
        downloadLink.href = certificadoImg;
        downloadLink.style.display = "inline-block";
    });
});
