const apiKeyImput = document.getElementById('apiKey');
const gameSelect = document.getElementById('gameSelect');
const quantityInput = document.getElementById('questionInput');
const button = document.getElementById('askButton');
const aiResponse = document.getElementById('aiResponse');
const form = document.getElementById('form');

// console.log(apiKeyImput, gameSelect, quantityInput, button, aiResponse, form,);

function enviarFormulario(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário.
}

form.addEventListener('submit', enviarFormulario);