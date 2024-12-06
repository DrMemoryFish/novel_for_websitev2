fetch('characters.json')
  .then(response => response.json())
  .then(data => {
    const characterGallery = document.querySelector('.character-gallery');
    const popOutCard = document.querySelector('#pop-out-card');

    // Create a document fragment to optimize DOM manipulation
    const fragment = document.createDocumentFragment();

    data.forEach(character => {
      // Fallback for missing image
      const imageSrc = character.image || 'default-image.jpg';

      // Create character card
      const characterCard = document.createElement('div');
      characterCard.classList.add('character-card', 'relative', 'cursor-pointer', 'rounded-lg', 'overflow-hidden');
      characterCard.innerHTML = `
        <div class="character-image">
          <img src="${imageSrc}" alt="${character.name}" class="w-full h-full object-cover" aria-labelledby="character-name">
        </div>
        <div class="character-text">
          <h2 class="text-xl font-bold" id="character-name">${character.name}</h2>
          <p class="text-sm">${character.description}</p>
          <p class="text-xs text-gray-600 mt-2">${character.backstory}</p>
        </div>
      `;

      // Add the character card to the fragment
      fragment.appendChild(characterCard);

      // Hover event handling for expansion
      let hoverTimer;
      characterCard.addEventListener('mouseenter', () => {
        hoverTimer = setTimeout(() => {
          characterCard.classList.add('expanded'); // Trigger expansion
        }, 500); // Delay before expanding
      });

      characterCard.addEventListener('mouseleave', () => {
        clearTimeout(hoverTimer);
        characterCard.classList.remove('expanded'); // Trigger collapse (reverse)
      });

      // Click event handling for the pop-out card
      characterCard.addEventListener('click', () => {
        popOutCard.classList.remove('hidden');
        popOutCard.innerHTML = `
          <h3 class="text-2xl font-bold">${character.name}</h3>
          <img src="${imageSrc}" alt="${character.name}" class="w-full h-auto object-cover mt-3 mb-3">
          <p class="text-lg">${character.description}</p>
          <p class="text-sm text-gray-600">${character.backstory}</p>
        `;
      });
    });

    // Append the character cards to the gallery all at once
    characterGallery.appendChild(fragment);
  })
  .catch(error => console.error('Error loading character data:', error));
