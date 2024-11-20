const btnOrganizacion = document.getElementById('btn-organizacion');
const btnDonante = document.getElementById('btn-donante');
const panelOrganizacion = document.getElementById('panel-organizacion');
const panelDonante = document.getElementById('panel-donante');

btnOrganizacion.addEventListener('click', () => {
    panelOrganizacion.classList.toggle('show');
    panelDonante.classList.remove('show');
});

btnDonante.addEventListener('click', () => {
    panelDonante.classList.toggle('show');
    panelOrganizacion.classList.remove('show');
});