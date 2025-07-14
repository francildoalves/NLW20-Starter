const apiKeyImput = document.getElementById('apiKey');
const gameSelect = document.getElementById('gameSelect');
const questionInput = document.getElementById('questionInput');
const button = document.getElementById('askButton');
const aiResponse = document.getElementById('aiResponse');
const form = document.getElementById('form');

//
const perguntarAI = async (apiKey, game, question) => {
    const modelo = "gemini-2.0-flash";
    const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent?key=${apiKey}`;
    const pergunta = `Tenho um jogo ${game} e gostaria de saber: ${question}`;
    
    const contents = [{
        parts: [{
            text: pergunta
        }]
    }];

    // Chamada para a API Gemini
    const response = await fetch(geminiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents: contents
        })
    })
    
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}


// Função para enviar o formulário e processar a pergunta.
const enviarFormulario = async (event) => {
    event.preventDefault(); // Previne o comportamento padrão do formulário.
    const apiKey = apiKeyImput.value;
    const game = gameSelect.value;
    const question = questionInput.value;


    if (apiKey == " " || game == " " || question == " ") {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    askButton.disabled = true; // Desabilita o botão após o primeiro clique para evitar múltiplos envios.
    askButton.textContent = 'Aguarde...'; // Altera o texto do botão para indicar que está enviando.
    askButton.classList.add('loading'); 

    try {
       const text = await perguntarAI(apiKey, game, question);
       aiResponse.querySelector('.response-content').innerHTML = text
        console.log('Erro:', error);        
    } finally {
        askButton.disabled = false; // Reabilita o botão após o envio.
        askButton.textContent = 'Perguntar'; // Restaura o texto do botão.
        askButton.classList.remove('loading'); // Remove a classe de loading.        
    }

}

form.addEventListener('submit', enviarFormulario);