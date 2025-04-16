const cardsContainer = document.querySelector('.cards-container');

async function fetchAndDisplayCards() {
  try {
    const response = await fetch('data/data.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const places = data.places;

    places.forEach(place => {
      const card = document.createElement('div');
      card.classList.add('card');

      const h2 = document.createElement('h2');
      h2.textContent = place.name;

      const figure = document.createElement('figure');
      const img = document.createElement('img');
      img.src = place.images[0];
      img.alt = place.name;
      img.width = 300; // As per your requirement
      img.height = 200; // As per your requirement
      figure.appendChild(img);

      const address = document.createElement('address');
      address.textContent = place.address;

      const description = document.createElement('p');
      description.textContent = place.description;

      const learnMoreButton = document.createElement('button');
      learnMoreButton.textContent = 'Learn More';
      if (place.website) {
        const link = document.createElement('a');
        link.href = place.website;
        link.textContent = 'Learn More';
        link.target = '_blank'; // Open in a new tab
        learnMoreButton.replaceWith(link);
      }

      card.appendChild(h2);
      card.appendChild(figure);
      card.appendChild(address);
      card.appendChild(description);
      card.appendChild(learnMoreButton);

      cardsContainer.appendChild(card);
    });

  } catch (error) {
    console.error('Could not fetch or display the discover items:', error);
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'Failed to load discover items.';
    cardsContainer.appendChild(errorMessage);
  }
}

fetchAndDisplayCards();