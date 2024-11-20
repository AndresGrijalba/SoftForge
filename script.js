function mostrarFormularioDonante() {
    document.getElementById("formularioDonante").classList.remove("oculto");
    document.getElementById("formularioOrganizacion").classList.add("oculto");
}

function mostrarFormularioOrganizacion() {
    document.getElementById("formularioOrganizacion").classList.remove("oculto");
    document.getElementById("formularioDonante").classList.add("oculto");
}

function enviarFormulario(tipo) {
    if (tipo === 'donante') {
        alert("Gracias por tu interés en donar. Nos pondremos en contacto contigo pronto.");
    } else if (tipo === 'organizacion') {
        alert("Gracias por registrarte. Revisaremos tu información y te contactaremos.");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // Elementos para el panel de la organización
    const formularioOrganizacion = document.getElementById("formularioOrganizacion");
    const panelOrganizacion = document.getElementById("panelOrganizacion");
    const btnAgregarNecesidad = document.getElementById("btnAgregarNecesidad");
    const listaNecesidades = document.getElementById("listaNecesidades");
    const btnGuardarCambios = document.getElementById("btnGuardarCambios");

    // Función para mostrar el panel después del registro
    const btnEnviarOrganizacion = document.getElementById("btnEnviarOrganizacion");
    btnEnviarOrganizacion.addEventListener("click", function() {
        formularioOrganizacion.style.display = "none"; // Ocultar formulario de registro
        panelOrganizacion.style.display = "block"; // Mostrar el panel de la organización
        alert("Registro completado. Bienvenido al panel de administración de su organización.");
    });

    // Agregar necesidades a la lista
    btnAgregarNecesidad.addEventListener("click", function() {
        const necesidad = document.getElementById("nuevaNecesidad").value;
        if (necesidad) {
            const item = document.createElement("li");
            item.textContent = necesidad;
            listaNecesidades.appendChild(item);
            document.getElementById("nuevaNecesidad").value = ""; // Limpiar campo
        } else {
            alert("Por favor, ingrese una necesidad.");
        }
    });

    // Guardar cambios de información
    btnGuardarCambios.addEventListener("click", function() {
        const nombre = document.getElementById("editarNombreOrganizacion").value;
        const email = document.getElementById("editarEmailOrganizacion").value;
        if (nombre && email) {
            alert("Información actualizada correctamente.");
            // Aquí podrías agregar código para actualizar la información en la base de datos o en un archivo JSON.
        } else {
            alert("Por favor, complete todos los campos.");
        }
    });
});
