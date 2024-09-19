let pokemonAtualId = null;

function procurarPokemon() {
    const nomeOuId = document.getElementById('inputPokemon').value.trim().toLowerCase();
    if (!nomeOuId) {
        window.alert('Por favor, insira o nome ou ID do Pokémon.');
        return;
    }
    buscarPokemonAPI(nomeOuId);
}

function buscarPokemonAPI(nomeOuId) {
    const url = `https://pokeapi.co/api/v2/pokemon/${nomeOuId}`;
    fetch(url)
        .then(resposta => {
            if (!resposta.ok) {
                throw new Error('Pokémon não encontrado');
            }
            return resposta.json();
        })
        .then(dados => {
            pokemonAtualId = dados.id;
            atualizarPokemon(dados);
            atualizarNavegacao();
        })
        .catch(erro => {
            alert('Erro: ' + erro.message);
        });
}

function atualizarPokemon(dados) {
    const imgPokemon = document.getElementById('imgPokemon');
    imgPokemon.src = dados.sprites.front_default;

    document.getElementById('exibirNomePokemon').innerText = dados.name.toUpperCase();
    document.getElementById('exibirTipoPokemon').innerText = `Tipo: ${dados.types.map(tipo => tipo.type.name).join(', ')}`;
    document.getElementById('exibirPesoPokemon').innerText = `Peso: ${dados.weight / 10} kg`;
    document.getElementById('exibirAlturaPokemon').innerText = `Altura: ${dados.height / 10} m`;

    const tipoPrincipal = dados.types[0].type.name;
    mudarCor(tipoPrincipal);
}

function mudarCor(tipo) {
    const container = document.querySelector('.container');
    container.className = 'container';
    container.classList.add(`tipo-pokemon-${tipo}`);
}

function atualizarNavegacao() {
    const navegacao = document.querySelector('.navegacao');
    navegacao.style.display = 'block';
    document.getElementById('botaoVoltar').disabled = pokemonAtualId === 1;
    document.getElementById('botaoProximo').disabled = false;
}

function mudarPokemon(direcao) {
    buscarPokemonAPI(pokemonAtualId += direcao);
}
