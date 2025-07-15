const apiKeyImput = document.getElementById('apiKey');
const gameSelect = document.getElementById('gameSelect');
const questionInput = document.getElementById('questionInput');
const button = document.getElementById('askButton');
const aiResponse = document.getElementById('aiResponse');
const form = document.getElementById('form');

const markdownToHTML = (text) => {
    const converter = new showdown.Converter();
    return converter.makeHtml(text);
}

//Perfunta à API Gemini
const perguntarAI = async (apiKey, game, question) => {
    const modelo = "gemini-2.0-flash";
    const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent?key=${apiKey}`;
    //Prompt para a API Gemini
    const pergunta = ` ## Especialidade
    Você é um assistente de meta para o jogo ${game}.

    ## Tarefa
    Você deve responder as perguntas do usuário com base em seu conhecimento do jogo, estratégias, builds e dicas.

    ## Regra
    - Considere a data atual ${new Date().toLocaleDateString('pt-BR')}, e não responda perguntas sobre eventos futuros ou passados que não sejam do jogo ${game};
    - Se você não sabe a resposta responda com 'Não sei';
    - Não tente inventar uma resposta;
    - Não fique se desculpando;
    - Se a pergunta não está relacionada ao jogo responda com 'Essa pergunta não está relacionada ao jogo ${game}';
    - Se a pergunta não faz sentido responda com 'Essa pergunta não faz sentido';
    - Faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente. Utilize as tools para afzer a pesuisa na internet quando necessário.
    - Nunca responda itens que você não tenha certeza que existem no patch atual do jogo ${game}.

    ## Respostas
    - Economize na resposta, seja direto e responda no máximo 500 caracteres.
    - Responda em markdown, com títulos, listas e formatação adequada.
    - Não faça saudação ou despedida, seja objetivo e responda o que foi perguntado.


    ## Exemplo de resposta
    Pergunta: Melhor build Rengar Jungle
    Resposta: A build mais atual é: /n/n**Itens**:/n/n adicione os itens aqui./n/n**Runas**:/n/n adicione as runas aqui./n/n**Habilidades**:/n/n adicione as habilidades aqui./n/n**Estratégia**:/n/n adicione a estratégia aqui./n/n**Dicas**:/n/n adicione as dicas aqui.

    ---
    No final mostre a pergunta do usuário: Sua pergunta: ${question}.`
    
    const contents = [{
        role: 'user',
        parts: [{
            text: pergunta
        }]
    }];

    const tools = [{
        google_search: {}
    }];

    // Chamada para a API Gemini
    const response = await fetch(geminiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents: contents,
            tools
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
       aiResponse.querySelector('.response-content').innerHTML = markdownToHTML(text);
       aiResponse.classList.remove('hidden'); // Exibe a resposta da IA.  
    } catch (error) {
        console.log('Erro ao perguntar à IA:', error);
    } finally {
        askButton.disabled = false; // Reabilita o botão após o envio.
        askButton.textContent = 'Perguntar'; // Restaura o texto do botão.
        askButton.classList.remove('loading'); // Remove a classe de loading.        
    }

}

form.addEventListener('submit', enviarFormulario);