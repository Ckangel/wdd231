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
          return null;
      }
  }

  return {
      getCurrentWeather: () => fetchWeatherData('weather'),
      getForecast: () => fetchWeatherData('forecast')
  };
})();

// Spotlight Members
const MemberManager = (() => {
  let membersData = [];

  async function fetchMembers() {
      try {
          const response = await fetch('members.json');
          if (!response.ok) throw new Error('Failed to load members');
          const data = await response.json();
          return data.records.filter(member => ['gold', 'silver'].includes(member.membershipLevel));
      } catch (error) {
          console.error('Members error:', error);
          return [];
      }
  }

  function createMemberCard(member) {
      const card = document.createElement('article');
      card.className = 'member-card';
      card.innerHTML = `
          <img src="${member.image}" alt="${member.name} business logo" loading="lazy">
          <h3>${member.name}</h3>
          <p>${member.address}</p>
          <p><a href="tel:${member.phone}">${member.phone}</a></p>
          <p><a href="${member.website}" target="_blank">Visit Site</a></p>
          <p>Membership Level: ${member.membershipLevel}</p>
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
    
    async function renderSpotlights() {
        membersData = await fetchMembers();
        const container = document.getElementById('members-container');
        container.innerHTML = '';
        const randomMembers = membersData.sort(() => Math.random() - 0.5).slice(0, 3);
        randomMembers.forEach(member => container.appendChild(createMemberCard(member)));
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
        },
        renderSpotlights
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

// Footer Date and Last Modified
function updateFooter() {
  const currentDate = new Date().toLocaleDateString();
  const lastModified = document.lastModified;

  document.querySelector('.footer-column p:last-child').textContent = `Last Modified: ${lastModified}`;
  document.querySelector('.footer-column p:nth-last-child(2)').textContent = `Current Date: ${currentDate}`;
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  MemberManager.renderSpotlights();

  WeatherAPI.getCurrentWeather().then(data => {
      if (data) {
          document.querySelector('.weather').innerHTML = `
              <p>Temperature: ${data.main.temp}°F</p>
              <p>Description: ${data.weather[0].description}</p>
          `;
      }
  });

  WeatherAPI.getForecast().then(data => {
      if (data) {
          const forecastHtml = data.list.slice(0, 3).map(item => `
              <p>${new Date(item.dt * 1000).toLocaleDateString()}: ${item.main.temp}°F</p>
          `).join('');
          document.querySelector('.forecast').innerHTML = forecastHtml;
      }
  });

  updateFooter();

  // Hamburger Menu Toggle
  document.querySelector('.hamburger').addEventListener('click', () => {
      document.querySelector('.responsive-nav').classList.toggle('active');
  });
});


