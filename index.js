fetch('./data/pokemon.json')
  .then(response => response.json())
  .then(data => {
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

    const pokemonArray = data.pokemon;

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

      document.querySelector('.cards').appendChild(newCard);
    });
  })
  .catch(error => {
    console.error('Error al cargar el archivo JSON:', error);
  });
