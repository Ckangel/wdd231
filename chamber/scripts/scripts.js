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
// If adding members dynamically
document.getElementById('members-container').addEventListener('click', (e) => {
    if(e.target.closest('.member-card')) {
      // Handle member card clicks
    }
  });

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

    async function renderSpotlights() {
        membersData = await fetchMembers();
        const container = document.getElementById('members-container');
        container.innerHTML = '';
        const randomMembers = membersData.sort(() => Math.random() - 0.5).slice(0, 3);
        randomMembers.forEach(member => container.appendChild(createMemberCard(member)));
    }

    return { renderSpotlights };
})();

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

// View Toggle Module
const ViewManager = (() => {
    const toggleView = (viewType) => {
      const container = document.getElementById('members-container');
      container.className = viewType;
      document.querySelectorAll('.toggle-view button').forEach(btn => 
        btn.classList.toggle('active-view', btn.id === `${viewType}-view`)
      );
      localStorage.setItem('viewPreference', viewType);
    };
  
    const initView = () => {
      const savedView = localStorage.getItem('viewPreference') || 'grid';
      toggleView(savedView);
    };
  
    return { toggleView, initView };
  })();
  
  // Initialize View
  document.getElementById('grid-view').addEventListener('click', () => ViewManager.toggleView('grid'));
  document.getElementById('list-view').addEventListener('click', () => ViewManager.toggleView('list'));
  
  // Member Display Module
const MemberDisplay = (() => {
    const createMemberCard = (member, isListView) => {
      const card = document.createElement('article');
      card.className = `member-card ${isListView ? 'list-view' : ''}`;
      card.innerHTML = `
        <img src="${member.image}" alt="${member.name}" loading="lazy">
        <div class="member-info">
          <h3>${member.name}</h3>
          <p><i class="fas fa-map-marker-alt"></i> ${member.address}</p>
          <p><i class="fas fa-phone"></i> <a href="tel:${member.phone}">${member.phone}</a></p>
          <p><i class="fas fa-globe"></i> <a href="${member.website}" target="_blank">Website</a></p>
          <p class="membership-badge">${member.membershipLevel} Member</p>
        </div>
      `;
      return card;
    };
  
    const renderMembers = (members, viewType) => {
      const container = document.getElementById('members-container');
      container.replaceChildren(...members.map(member => 
        createMemberCard(member, viewType === 'list')
      ));
    };
  
    return { renderMembers };
  })();

  // Responsive Navigation
const Navigation = (() => {
    const init = () => {
      const hamburger = document.querySelector('.hamburger');
      const nav = document.querySelector('.responsive-nav');
  
      hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', 
          nav.classList.contains('active').toString()
        );
      });
    };
  
    return { init };
  })();
  