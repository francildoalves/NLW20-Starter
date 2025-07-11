const apiKeyImput = document.getElementById('apiKey');
const gameSelect = document.getElementById('gameSelect');
const questionInput = document.getElementById('questionInput');
const button = document.getElementById('askButton');
const aiResponse = document.getElementById('aiResponse');
const form = document.getElementById('form');

const perguntarAI = async (apiKey, game, question) => {
    const modelo = "gemini-2.0-flash";
    const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent?key=${apiKey}`;
    const pergunta = ``;
    
    const contents = [
        parts: [{
            text: pergunta
        }]
    ];

    // Chamada para a API Gemini
    const response = await fetch(geminiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })  

}


// Função para enviar o formulário e processar a pergunta.
const enviarFormulario = (event) => {
    event.preventDefault(); // Previne o comportamento padrão do formulário.
    const apiKey = apiKeyImput.value;
    const game = gameSelect.value;
    const question = questionInput.value;

    console.log({apiKey, game, question});

    if (apiKey == " " || game == " " || question == " ") {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    askButton.disabled = true; // Desabilita o botão após o primeiro clique para evitar múltiplos envios.
    askButton.textContent = 'Aguarde...'; // Altera o texto do botão para indicar que está enviando.
    askButton.classList.add('loading'); 

    try {
        perguntarAI(apiKey, game, question);
    } catch (error) {
        alert('Ocorreu um erro ao enviar a pergunta. Por favor, tente novamente.');        
    } finally {
        askButton.disabled = false; // Reabilita o botão após o envio.
        askButton.textContent = 'Perguntar'; // Restaura o texto do botão.
        askButton.classList.remove('loading'); // Remove a classe de loading.        
    }

}

form.addEventListener('submit', enviarFormulario);