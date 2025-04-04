// main.js

// Update the current year and last modified date
const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;
const lastModified = document.lastModified;
document.getElementById('lastModified').textContent = lastModified;

// Theme toggle functionality
const themeToggleButton = document.getElementById('theme-toggle-button');
themeToggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggleButton.innerHTML = document.body.classList.contains('dark-mode') ?
        '<img src="images/light.png" alt="Light Mode Icon">' :
        '<img src="images/dark.png" alt="Dark Mode Icon">';
});

// Toggle the menu
document.getElementById('menu-toggle-button').addEventListener('click', function() {
    const navLinks = document.getElementById('nav-links');
    const menuButton = document.getElementById('menu-toggle-button');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    menuButton.textContent = navLinks.style.display === 'flex' ? '✖' : '☰';
});

// Weather fetching functions and variables
async function fetchWeatherData(lat, long, apiKey) {
    const myURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(myURL);
        if (response.ok) {
            const data = await response.json();
            displayWeatherResults(data);
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
}

function displayWeatherResults(data) {
    document.querySelector('#current-temp').innerHTML = `${data.main.temp} °C`;
    const iconSrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    document.querySelector('#weather-icon').setAttribute('src', iconSrc);
    document.querySelector('#weather-desc').textContent = data.weather[0].description;
    document.querySelector('#rain-chance').textContent = `${data.clouds.all}%`;
}

// Weather data for Tema
fetchWeatherData("5.76709", "-0.01277", "f069271b520638efcd4604e88d664323");


// Fetch members and spotlights
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

// Member display functionality
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

// Joining page functionalities
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submit-date').value = new Date().toISOString().split('T')[0];

    const modalBtns = document.querySelectorAll('.learn-more');
    modalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            document.getElementById(modalId).style.display = 'block';
        });
    });

    // Close modals
    const closeBtns = document.querySelectorAll('.close');
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal').style.display = 'none';
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
        }
    });

    // Form submission
    const form = document.getElementById('membership-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        const params = new URLSearchParams();
        formData.forEach((value, key) => {
            if (value && form.elements[key].required) {
                params.append(key, value);
            }
        });
        window.location.href = `thankyou.html?${params.toString()}`;
    });
});

// Open Modals
document.querySelectorAll('.modal-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
        const modalId = trigger.getAttribute('data-target');
        const modal = document.getElementById(modalId);
        modal.showModal();
    });
});

// Close Modals with "X" Button
document.querySelectorAll('.close-modal-x').forEach(button => {
    button.addEventListener('click', () => {
        button.closest('dialog').close();
    });
});

// Accessibility (Close Modal with Escape Key)
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        document.querySelectorAll('dialog[open]').forEach(modal => {
            modal.close();
        });
    }
});


// Populate the timestamp field with the current date and time
document.addEventListener("DOMContentLoaded", () => {
    const timestampField = document.getElementById("timestamp");
    const now = new Date();
    timestampField.value = now.toISOString(); // Use ISO format for consistency
});


 const myInfo = new URLSearchParams(window.location.search);

document.querySelector('#results').innerHTML = `
<p>Name: ${myInfo.get('firstName')} ${myInfo.get('lastName')}</p>
<p>Email: ${myInfo.get('email')}</p>
<p>Phone: ${myInfo.get('mobile')}</p>
<p>Business Name: ${myInfo.get('businessName')}</p>

`;

 // Display the timestamp
 const timestamp = myInfo.get('timestamp');
 if (timestamp) {
     document.querySelector('#timestamp-display').textContent = `Form Submitted At: ${new Date(timestamp).toLocaleString()}`;
 }