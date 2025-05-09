const cadastroButton = document.querySelector('#cadastrarBotao');
if (cadastroButton) {
    cadastroButton.addEventListener('click', () => {
        window.location.href = 'cadastro.html';
    });
}


const entrarButton = document.querySelector('.entrarBotao');
if (entrarButton) {
    entrarButton.addEventListener('click', () => {
        const matriculaInput = document.querySelector('input[type="text"]');
        const matricula = matriculaInput ? matriculaInput.value.trim() : "";

        if (matricula.toLowerCase() === "admin") {
            window.location.href = 'homeAdm.html';
        } else {
            window.location.href = 'home.html';
        }
    });
}