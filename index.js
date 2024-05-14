function loadPokemonData() {
  return fetch('./data/pokemon.json')
    .then(response => response.json())
    .catch(error => {
      console.error('Error al cargar el archivo JSON:', error);
    });
}

function showPokemon(pokemonArray) {
  const cardsContainer = document.querySelector('.cards');
  const POKEMON_TYPES_ICONS = {
    fire: 'bxs-hot',
    flying: 'bx-wind',
    water: 'bx-water',
    grass: 'bx-leaf',
    bug: 'bxs-bug',
    electric: 'bxs-bolt',
    poison: 'bxs-skull',
    fighting: 'bx-error-circle',
    ground: 'bx-tree-alt',
    normal: 'bx-sun',
    psychic: 'bxs-magic-wand',
    ghost: 'bx-ghost'
  };

  cardsContainer.innerHTML = '';

  pokemonArray.forEach(pokemon => {
    const newCard = document.createElement('div');
    newCard.classList.add('pokemon-card');
    newCard.classList.add(pokemon.type[0]);

    newCard.innerHTML = `
      <div class="pokemon-card__type-label ${pokemon.type[0]}">
        <i class="pokemon-card__name-icon bx ${POKEMON_TYPES_ICONS[pokemon.type[0]]}"></i>
        <span>${pokemon.type[0]}</span>
      </div>
      <div class="pokemon-card__image">
        <img src="${pokemon.img}" loading="lazy">
      </div>
      <div class="pokemon-card__name">
        <h4>${pokemon.name}</h4>
      </div>
      <p class="pokemon-card__eyebrow">#${pokemon.num}</p>
    `;

    cardsContainer.appendChild(newCard);
    document.querySelector('.cards').appendChild(newCard);
  });
}

function searchPokemon(pokemonArray, searchText) {
  return pokemonArray.filter(pokemon => pokemon.name.toLowerCase().includes(searchText));
}

function filterPokemon(pokemonArray, type, weaknesses) {
  let pokemons = pokemonArray;

  if (type.length > 0) {
    pokemons = pokemonArray.filter(pokemon => pokemon.type[0] === type);
  }
  if (weaknesses.length > 0) {
    pokemons = pokemons.filter(pokemon => pokemon.weaknesses[0] === weaknesses);
  }
  return pokemons;
}

loadPokemonData().then(data => {
  const pokemonArray = data.pokemon;

  showPokemon(pokemonArray);

  const searchButton = document.querySelector('.search-bar input[type="button"]');
  const searchInput = document.querySelector('.search-bar input[type="text"]');
  const selectedType = document.querySelector('#types');
  const selectedWeaknesses = document.querySelector('#weaknesses');
  const filterButton = document.querySelector('#filter-button');
  const cleanFiltersButton = document.querySelector('.filter .reverted');

  searchButton.addEventListener('click', function () {
    const searchText = searchInput.value.trim().toLowerCase();
    const filteredPokemon = searchPokemon(pokemonArray, searchText);
    showPokemon(filteredPokemon);
  });

  searchInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      const searchText = searchInput.value.trim().toLowerCase();
      const filteredPokemon = searchPokemon(pokemonArray, searchText);
      showPokemon(filteredPokemon);
    }
  });

  filterButton.addEventListener('click', function () {
    const type = selectedType.value.trim().toLowerCase();
    const weaknesses = selectedWeaknesses.value.trim().toLowerCase();
    const filteredPokemon = filterPokemon(pokemonArray, type, weaknesses);
    showPokemon(filteredPokemon);
  });

  cleanFiltersButton.addEventListener('click', function () {
    selectedType.value = ''; 
    selectedWeaknesses.value = ''; 
    const filteredPokemon = pokemonArray; 
    showPokemon(filteredPokemon);
  });

});























