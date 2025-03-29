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

  document.addEventListener('DOMContentLoaded', function() {
    const gridViewBtn = document.getElementById('grid-view');
    const listViewBtn = document.getElementById('list-view');
    const container = document.getElementById('members-container');
    
    // Default to grid view
    let currentView = 'grid';
    gridViewBtn.classList.add('active');
    
    // Sample data (replace with actual fetch from member.json)
    const memberData = {
        "records": [
            { "name": "John Tawiah", "address": "123 Main St", "phone": "123-456-7890", "website": "https://lucozade.com", "image": "images/lucozade.png", "membershipLevel": "Gold" },
            { "name": "Alice Brown", "address": "789 Elm St", "phone": "456-789-1230", "website": "http://www.polytankgh.com/", "image": "images/polytank.png", "membershipLevel": "Gold" },
            { "name": "Jane Smith", "address": "456 Oak St", "phone": "789-123-4560", "website": "https://www.unilever.com/", "image": "images/omo.png", "membershipLevel": "Silver" },
            { "name": "Charlie White", "address": "321 Pine St", "phone": "987-654-3210", "website": "https://www.gsa.gov.gh/made-in-ghana/", "image": "images/made-in-ghana.png", "membershipLevel": "Silver" },
            { "name": "Bob Johnson", "address": "654 Cedar St", "phone": "555-555-5555", "website": "https://www.haleon.com", "image": "images/panadol.png", "membershipLevel": "Bronze" },
            { "name": "Efo Larson", "address": "789 Elm St", "phone": "444-444-4444", "website": "https://www.diageo.com/en/", "image": "images/alvaro1.png", "membershipLevel": "Gold" },
            { "name": "John Doe", "address": "123 Main St", "phone": "333-333-3333", "website": "https://thebftonline.com", "image": "images/b-and-ft.png", "membershipLevel": "Gold" },
            { "name": "Alice Brown", "address": "456 Elm St", "phone": "222-222-2222", "website": "https://belaqua.com.gh", "image": "images/belaqua.png", "membershipLevel": "Gold" },
            { "name": "Jane Smith", "address": "789 Oak St", "phone": "111-111-1111", "website": "https://compughana.com", "image": "images/compu-ghana.png", "membershipLevel": "Silver" },
            { "name": "Charlie White", "address": "321 Pine St", "phone": "999-999-9999", "website": "https://velowestafrica.com/pixel/", "image": "images/coral-dilux.png", "membershipLevel": "Silver" },
            { "name": "Bob Johnson", "address": "789 Oak St", "phone": "555-555-5555", "website": "https://devtraco.com/", "image": "images/devtraco-ltd.png", "membershipLevel": "Bronze" },
            { "name": "Alonge Mensah", "address": "321 Pine St", "phone": "444-444-4444", "website": "https://ecobank.com/", "image": "images/ecobank.png", "membershipLevel": "Gold" },
            { "name": "Charlie Balcky", "address": "654 Cedar St", "phone": "333-333-3333", "website": "https://www.goldentreeghana.com", "image": "images/golden-tree.png", "membershipLevel": "Silver" },
            { "name": "New Member", "address": "123 New St", "phone": "111-111-1111", "website": "https://www.b5plusgroup.com/", "image": "images/b5-group.png", "membershipLevel": "Bronze" }
        ]
    };
    
    // In a real implementation, you would fetch this data:
    // fetch('member.json')
    //     .then(response => response.json())
    //     .then(data => {
    //         renderMembers(data.records, currentView);
    //         // ... rest of the code
    //     })
    
    // For this demo, we'll use the sample data directly
    renderMembers(memberData.records, currentView);
    
    // Add event listeners for view toggle
    gridViewBtn.addEventListener('click', () => {
        if (currentView !== 'grid') {
            currentView = 'grid';
            renderMembers(memberData.records, currentView);
            gridViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
        }
    });
    
    listViewBtn.addEventListener('click', () => {
        if (currentView !== 'list') {
            currentView = 'list';
            renderMembers(memberData.records, currentView);
            listViewBtn.classList.add('active');
            gridViewBtn.classList.remove('active');
        }
    });
    
    function renderMembers(members, viewType) {
        container.innerHTML = '';
        container.className = `${viewType}-view`;
        
        members.forEach(member => {
            const memberElement = viewType === 'grid' ? createGridCard(member) : createListItem(member);
            container.appendChild(memberElement);
        });
    }
    
    function createGridCard(member) {
        const card = document.createElement('div');
        card.className = 'member-card';
        
        const membershipClass = member.membershipLevel.toLowerCase();
        
        card.innerHTML = `
            <img src="${member.image || 'https://via.placeholder.com/250x180'}" alt="${member.name}" onerror="this.src='https://via.placeholder.com/250x180'">
            <h3>
                ${member.name}
                <span class="membership-badge ${membershipClass}">${member.membershipLevel}</span>
            </h3>
            <div class="member-info">
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
            </div>
            <a href="${member.website}" class="website-link" target="_blank" rel="noopener noreferrer">${new URL(member.website).hostname}</a>
        `;
        
        return card;
    }
    
    function createListItem(member) {
        const item = document.createElement('div');
        item.className = 'list-item';
        
        const membershipClass = member.membershipLevel.toLowerCase();
        
        item.innerHTML = `
            <img src="${member.image || 'https://via.placeholder.com/150x150'}" alt="${member.name}" onerror="this.src='https://via.placeholder.com/150x150'">
            <div class="info">
                <h3>
                    ${member.name}
                    <span class="membership-badge ${membershipClass}">${member.membershipLevel}</span>
                </h3>
                <div class="member-details">
                    <p><strong>Address:</strong> ${member.address}</p>
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <p><strong>Website:</strong> <a href="${member.website}" class="website-link" target="_blank" rel="noopener noreferrer">${member.website}</a></p>
                </div>
            </div>
        `;
        
        return item;
    }
});