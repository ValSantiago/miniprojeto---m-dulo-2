/** Implemente seu código abaixo. Boa sorte! */

function atualizarListaInteresses() {
    const listaInteresses = document.getElementById ('listaInteresses');
    listaInteresses.innerHTML = '';
    const interesses = JSON.parse (localStorage.getItem('meus-interesses')) || [];
    interesses.forEach (interesse => {
        const li = document.createElement ('li');
        li.textContent = interesse;
        listaInteresses.appendChild (li);
    });
}

function adicionarInteresse() {
    const input = document.getElementById ('novoInteresse');
    const novoInteresse = input.value.trim ();
    if (novoInteresse) {
        const interesses = JSON.parse (localStorage.getItem ('meus-interesses')) || [];
        interesses.push (novoInteresse);
        localStorage.setItem ('meus-interesses', JSON.stringify(interesses));
        input.value = '';
        atualizarListaInteresses ();
    }
}

function limparListaInteresses () {
    localStorage.removeItem ('meus-interesses');
    atualizarListaInteresses ();
}

document.getElementById ('adicionar').addEventListener ('click', adicionarInteresse);

document.getElementById ('limparLista').addEventListener ('click', limparListaInteresses);

setInterval (atualizarListaInteresses, 1000);


function recuperarNoticiaDoDia() {
    fetch ('https://servicodados.ibge.gov.br/api/v3/noticias/?tipo=release')
        .then (response => response.json ())
        .then (data => {
            const noticia = data.items [0];
            const elementoNoticia = document.querySelector ('.noticia');
            if (noticia) {
                elementoNoticia.textContent = noticia.titulo;
            } else {
                elementoNoticia.textContent = 'Nenhuma notícia disponível no momento.';
            }
        })
        .catch (error => {
            console.error ('Erro ao recuperar notícia:', error);
        });
}

document.addEventListener ('DOMContentLoaded', () => {
    atualizarListaInteresses ();
    recuperarNoticiaDoDia ();
});