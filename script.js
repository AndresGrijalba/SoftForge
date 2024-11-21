
function registrarDonante(event) {
    event.preventDefault(); 
    const nombre = document.getElementById("nombreDonante").value;
    const email = document.getElementById("emailDonante").value;
    const intereses = document.getElementById("interesesDonante").value;
    
    console.log("Datos del Donante:");
    console.log("Nombre:", nombre);
    console.log("Correo Electrónico:", email);
    console.log("Intereses:", intereses);
    
    alert("¡Donante registrado con éxito!");
}
document.getElementById("formDonante").addEventListener("submit", registrarDonante);
