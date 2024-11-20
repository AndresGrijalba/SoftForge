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
