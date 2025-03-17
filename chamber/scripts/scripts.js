// Weather Module
const WeatherAPI = (() => {
  const API_KEY = 'f069271b520638efcd4604e88d664323';
  const LOCATION = 'Tema, Ghana';
  const UNITS = 'imperial';

  async function fetchWeatherData(endpoint) {
    const url = `https://api.openweathermap.org/data/2.5/${endpoint}?q=${LOCATION}&units=${UNITS}&appid=${API_KEY}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`Weather API error: ${error.message}`);
      showErrorToast('Failed to load weather data');
      return null;
    }
  }

  return {
    getCurrentWeather: () => fetchWeatherData('weather'),
    getForecast: () => fetchWeatherData('forecast')
  };
})();

// Members Module
const MemberManager = (() => {
  let membersData = [];

  async function fetchMembers() {
    try {
      const response = await fetch('members.json');
      if (!response.ok) throw new Error('Failed to load members');
      const data = await response.json();
      return data.records;
    } catch (error) {
      console.error('Members error:', error);
      showErrorToast('Failed to load member directory');
      return [];
    }
  }

  function createMemberCard(member) {
    const card = document.createElement('article');
    card.className = 'member-card';
    card.innerHTML = `
      <img src="${member.image}" alt="${member.name} business logo" loading="lazy">
      <h3>${member.name}</h3>
      <dl>
        <div>
          <dt>Address</dt>
          <dd>${member.address}</dd>
        </div>
        <div>
          <dt>Phone</dt>
          <dd><a href="tel:${member.phone}">${member.phone}</a></dd>
        </div>
        <div>
          <dt>Website</dt>
          <dd><a href="${member.website}" target="_blank" rel="noopener">Visit Site</a></dd>
        </div>
        <div>
          <dt>Membership</dt>
          <dd>${member.membershipLevel}</dd>
        </div>
      </dl>
    `;
    return card;
  }

  return {
    init: async () => {
      membersData = await fetchMembers();
      this.renderMembers('grid');
    },
    renderMembers: (view) => {
      const container = document.getElementById('members-container');
      container.className = view;
      container.replaceChildren(...membersData.map(createMemberCard));
    }
  };
})();

// Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => console.log('SW registered'))
      .catch(err => console.log('SW registration failed:', err));
  });
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  MemberManager.init();
  
  // Weather Updates
  Promise.all([WeatherAPI.getCurrentWeather(), WeatherAPI.getForecast()])
    .then(([current, forecast]) => {
      updateWeatherDisplay(current);
      updateForecastDisplay(forecast);
    });

  // View Toggles
  document.getElementById('grid-view').addEventListener('click', () => {
    MemberManager.renderMembers('grid');
    setActiveButton('grid-view');
  });
  
  document.getElementById('list-view').addEventListener('click', () => {
    MemberManager.renderMembers('list');
    setActiveButton('list-view');
  });
});

// Helper Functions
function setActiveButton(activeId) {
  document.querySelectorAll('.toggle-view button').forEach(btn => {
    btn.classList.toggle('active', btn.id === activeId);
  });
}

function showErrorToast(message) {
  const toast = document.createElement('div');
  toast.className = 'error-toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 5000);
}


