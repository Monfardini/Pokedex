const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_img');
const pokemonImageShiny = document.querySelector('.pokemon_img_shiny');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const ButtonPrev = document.querySelector('.button-btn-prev');
const ButtonNext = document.querySelector('.button-btn-next');

let searchPokemon = 1;

/* Função para buscar Pokémon na API */
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
    return null; // Retorna null se a requisição falhar
}

/* Função para renderizar ambos os tipos de Pokémon */
const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
        // Atualiza os dados para o Pokémon normal
        pokemonImage.style.display = 'block';
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

        // Atualiza os dados para o Pokémon shiny
        pokemonImageShiny.style.display = 'block';
        pokemonImageShiny.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny'];

        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        input.value = '';
        searchPokemon = data.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonImageShiny.style.display = 'none';
        pokemonName.innerHTML = 'Not found :c';
        pokemonNumber.innerHTML = '';
    }
}

/* Eventos */
form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

ButtonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

ButtonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

/* Inicializa com o primeiro Pokémon */
renderPokemon(searchPokemon);
