// Weather Module
const WeatherAPI = (() => {
    const API_KEY = 'f069271b520638efcd4604e88d664323';
    const LOCATION = 'Tema, Ghana';
    const UNITS = 'imperial';
  
    const fetchWeatherData = async (endpoint) => {
      const url = `https://api.openweathermap.org/data/2.5/${endpoint}?q=${LOCATION}&units=${UNITS}&appid=${API_KEY}`;
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
      } catch (error) {
        console.error(`Weather API error: ${error.message}`);
        return null;
      }
    };
  
    const updateWeatherDisplay = async () => {
      const currentWeather = await fetchWeatherData('weather');
      const forecast = await fetchWeatherData('forecast');
      
      if (currentWeather) {
        const weatherElement = document.querySelector('.weather');
        if (weatherElement) {
          weatherElement.innerHTML = `
            <p>Temperature: ${currentWeather.main.temp}°F</p>
            <p>Description: ${currentWeather.weather[0].description}</p>
          `;
        }
      }
      
      if (forecast) {
        const forecastHtml = forecast.list.slice(0, 3).map(item => `
          <p>${new Date(item.dt * 1000).toLocaleDateString()}: ${item.main.temp}°F</p>
        `).join('');
        const forecastElement = document.querySelector('.forecast');
        if (forecastElement) {
          forecastElement.innerHTML = forecastHtml;
        }
      }
    };
  
    return { updateWeatherDisplay };
  })();
  
  // Spotlight Members
  const MemberManager = (() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('members.json');
        if (!response.ok) throw new Error('Failed to load members');
        const data = await response.json();
        return data.records.filter(member => ['gold', 'silver'].includes(member.membershipLevel));
      } catch (error) {
        console.error('Members error:', error);
        return [];
      }
    };
  
    const createMemberCard = (member) => {
      const card = document.createElement('article');
      card.className = 'member-card';
      card.innerHTML = `
        <img src=${member.image} alt=${member.name} loading=lazy>
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p><a href=tel:${member.phone}>${member.phone}</a></p>
        <p><a href=${member.website} target=_blank>Visit Site</a></p>
        <p>Membership Level: ${member.membershipLevel}</p>
      `;
      return card;
    };
  
    const renderSpotlights = async () => {
      const membersData = await fetchMembers();
      const container = document.getElementById('members-container');
      if (container) {
        container.innerHTML = '';
        const randomMembers = membersData.sort(() => Math.random() - 0.5).slice(0, 3);
        randomMembers.forEach(member => container.appendChild(createMemberCard(member)));
      }
    };
  
    return { renderSpotlights };
  })();
  
  // Footer Date and Last Modified
  const updateFooter = () => {
    const footerColumn = document.querySelector('.footer-column');
    if (footerColumn) {
      const lastChild = footerColumn.querySelector(':last-child');
      const secondLastChild = footerColumn.querySelector(':nth-last-child(2)');
      const lastModified = document.lastModified;
      const currentDate = new Date().toLocaleDateString();
      if (lastChild) lastChild.textContent = `Last Modified: ${lastModified}`;
      if (secondLastChild) secondLastChild.textContent = `Current Date: ${currentDate}`;
    }
  };
  
  // View Toggle Module
  const ViewManager = (() => {
    const toggleView = (viewType) => {
      const container = document.getElementById('members-container');
      if (container) {
        container.className = viewType;
        document.querySelectorAll('.toggle-view button').forEach(btn => 
          btn.classList.toggle('active-view', btn.id === `${viewType}-view`)
        );
        localStorage.setItem('viewPreference', viewType);
      }
    };
  
    const initView = () => {
      const savedView = localStorage.getItem('viewPreference') || 'grid';
      toggleView(savedView);
    };
  
    return { toggleView, initView };
  })();
  
  // Member Display Module
  const MemberDisplay = (() => {
    const createMemberCard = (member, isListView) => {
      const card = document.createElement('article');
      card.className = `member-card ${isListView ? 'list-view' : ''}`;
      card.innerHTML = `
        <div>
          <img src=${member.image} alt=${member.name} loading=lazy>
          <div class=member-info>
            <h3>${member.name}</h3>
            <p><i class=fas fa-map-marker-alt></i> ${member.address}</p>
            <p><i class=fas fa-phone></i> <a href=tel:${member.phone}>${member.phone}</a></p>
            <p><i class=fas fa-globe></i> <a href=${member.website} target=_blank>Website</a></p>
            <p class=membership-badge>${member.membershipLevel} Member</p>
          </div>
        </div>
      `;
      return card;
    };
  
    const renderMembers = (members, viewType) => {
      const container = document.getElementById('members-container');
      if (container) {
        container.replaceChildren(...members.map(member => 
          createMemberCard(member, viewType === 'list')
        ));
      }
    };
  
    return { renderMembers };
  })();
  
  // Responsive Navigation
  const Navigation = (() => {
    const init = () => {
      const hamburger = document.querySelector('.hamburger');
      const nav = document.querySelector('.responsive-nav');
      if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
          nav.classList.toggle('active');
          hamburger.setAttribute('aria-expanded', nav.classList.contains('active'));
        });
      }
    };
    return {init};
  })();
  
  // Initialization
  document.addEventListener('DOMContentLoaded', () => {
    WeatherAPI.updateWeatherDisplay();
    MemberManager.renderSpotlights();
    updateFooter();
    ViewManager.initView();
    Navigation.init();
  });