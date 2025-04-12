function loadCards() {
    const cardsContainer = document.querySelector('.cards-container');

    fetch('data/places.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            cardsContainer.innerHTML = '';

            data.forEach(item => {
                const cards = document.createElement('article');
                cards.classList.add('cards');

                cards.innerHTML = `
                    <h2>${item.name}</h2>
                    <figure>
                        <img src="${item.image}" alt="${item.name}">
                    </figure>
                    <address>${item.address}</address>
                    <p>${item.description}</p>
                    <button>Learn More</button>
                `;

                cardsContainer.appendChild(cards); 
            });
        })
        .catch(error => {
            console.error('Error fetching or processing JSON:', error); 
            cardsContainer.innerHTML = '<p>Failed to load items. Please try again later.</p>'; 
        });
}

window.onload = function() {
    loadCards(); 
    displayVisitorMessage(); 
}

// Function to handle visit messages
function handleVisitMessage() {
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();
    const visitMessage = document.getElementById('visit-message');

    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysSinceLastVisit = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
        if (daysSinceLastVisit < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else {
            visitMessage.textContent = `You last visited ${daysSinceLastVisit} day${daysSinceLastVisit > 1 ? 's' : ''} ago.`;
        }
    }
    localStorage.setItem('lastVisit', now);
}

// Function to fetch items from JSON file
async function fetchItems() {
    try {
        const response = await fetch('data/places.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const items = await response.json();
        displayCards(items);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    fetchItems();
    handleVisitMessage();
});