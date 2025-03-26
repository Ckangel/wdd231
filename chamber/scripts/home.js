const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;

const lastModified = document.lastModified;
document.getElementById('lastModified').textContent = lastModified;


const themeToggleButton = document.getElementById('theme-toggle-button');

        themeToggleButton.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');

            // Update the button image based on the current mode
            if (document.body.classList.contains('dark-mode')) {
                themeToggleButton.innerHTML = '<img src="images/light.png" alt="Light Mode Icon">';
            } else {
                themeToggleButton.innerHTML = '<img src="images/dark.png" alt="Dark Mode Icon">';
            }
        });

// toggle the menu
document.getElementById('menu-toggle-button').addEventListener('click', function() {
    const navLinks = document.getElementById('nav-links');
    const menuButton = document.getElementById('menu-toggle-button');
    if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
        menuButton.textContent = '☰';
    } else {
        navLinks.style.display = 'flex';
        menuButton.textContent = '✖';
    }
});


// Select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const weatherDesc = document.querySelector('#weather-desc');
const rainChance = document.querySelector('#rain-chance');

// Correct the API URL
const myLat = "6.6070"; // Latitude for Ho, Ghana
const myLong = "0.4710"; // Longitude for Ho, Ghana
const apiKey = "7eb0cb04810073133b438b91b586be8e"; // Use your actual API key
const myURL = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${apiKey}&units=metric`; // Metric for Celsius

async function apiFetch() {
    try {
        const response = await fetch(myURL); // Use corrected URL
        if (response.ok) {
            const data = await response.json();
            console.log(data); // Check your fetched data here
            displayResults(data); // Call the function to display data
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
}

function displayResults(data) {
    // Update temperature
    currentTemp.innerHTML = `${data.main.temp} °C`;

    // Update weather icon and description
    const iconSrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    const desc = data.weather[0].description;

    weatherIcon.setAttribute('src', iconSrc);
    weatherIcon.setAttribute('alt', desc);
    weatherDesc.textContent = desc; // Update description

    // Update chance of rain (use 'clouds.all' for a rough estimate as OpenWeatherMap doesn't provide exact rain probability in some plans)
    rainChance.textContent = `${data.clouds.all}%`; // % Cloudiness roughly indicates rain likelihood
}

// Fetch the weather data
apiFetch();

// Forecast for the next three days
async function fetchWeatherForecast() {
    const apiKey = "f069271b520638efcd4604e88d66432"; 
    const myLat = "6.6070";
    const myLong = "-0.021474086331179875";
    const myURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&appid=${apiKey}&units=metric`; // Metric for Celsius

    try {
        const response = await fetch(myURL);
        const data = await response.json();

        // Update the forecast for the next three days
        document.getElementById('day1-temp').textContent = `${Math.round(data.list[0].main.temp)}º C`;
        document.getElementById('day2-temp').textContent = `${Math.round(data.list[8].main.temp)}º C`;
        document.getElementById('day3-temp').textContent = `${Math.round(data.list[16].main.temp)}º C`;

        // Display all weather events for the current weather
        const weatherDesc = data.list[0].weather.map(event => capitalizeWords(event.description)).join(', ');
        document.getElementById('weather-desc').textContent = weatherDesc;

        // Display the chance of rain
        document.getElementById('rain-chance').textContent = `${Math.round(data.list[0].pop * 100)}%`;

    } catch (error) {
        console.error('Error fetching weather forecast:', error);
    }
}

function capitalizeWords(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

fetchWeatherForecast();


async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const members = await response.json();
        if (document.body.classList.contains('home')) {
            displaySpotlights(members);
        } else {
            displayMembers(members);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function displayMembers(members) {
    const membersContainer = document.getElementById('members');
    if (!membersContainer) return; // Ensure the container exists
    membersContainer.innerHTML = '';

    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.classList.add('member-card');
        memberCard.innerHTML = `
            <h3>${member.name}</h3>
            <p class="address">${member.address}</p>
            <hr>
            <img src="images/${member.image}" alt="${member.name}" loading="lazy">
            <div>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
                <p><strong>Membership Level:</strong> ${member.membershipLevel}</p>
            </div>
        `;
        membersContainer.appendChild(memberCard);
    });
}

function displaySpotlights(members) {
    const spotlightContainer = document.getElementById('spotlights');
    if (!spotlightContainer) return; // Ensure the container exists
    spotlightContainer.innerHTML = '';

    // Filter gold (membershipLevel 1) and silver (membershipLevel 2) members
    const spotlightMembers = members.filter(member => member.membershipLevel === 1 || member.membershipLevel === 2);

    // Randomly select two or three members
    const selectedMembers = [];
    const numberOfSpotlights = Math.min(spotlightMembers.length, 3);
    while (selectedMembers.length < numberOfSpotlights) {
        const randomIndex = Math.floor(Math.random() * spotlightMembers.length);
        const selectedMember = spotlightMembers.splice(randomIndex, 1)[0];
        selectedMembers.push(selectedMember);
    }

    // Display the selected members
    selectedMembers.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.classList.add('spotlight-card');
        memberCard.innerHTML = `
            <h3>${member.name}</h3>
            <img src="images/${member.image}" alt="${member.name}" loading="lazy">
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
            <p><strong>Membership Level:</strong> ${member.membershipLevel === 1 ? 'Gold' : 'Silver'}</p>
        `;
        spotlightContainer.appendChild(memberCard);
    });
}

document.getElementById('grid-view')?.addEventListener('click', () => {
    document.getElementById('members').classList.add('grid');
    document.getElementById('members').classList.remove('list');
});

document.getElementById('list-view')?.addEventListener('click', () => {
    document.getElementById('members').classList.add('list');
    document.getElementById('members').classList.remove('grid');
});

// Call fetchMembers to display members or spotlights
fetchMembers();


const API_KEY = '';
    const LOCATION = 'Tema, Ghana';
    const UNITS = 'imperial';
