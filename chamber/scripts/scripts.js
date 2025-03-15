self.addEventListener('fetch', (event) => {
    if (event.request.url.includes('/images/')) {
      const width = getClientWidth(event.request);
      event.respondWith(
        caches.match(`/images/${width}/${getFilename(event.request.url)}`)
          .then(response => response || fetchAndCacheImage(event.request, width))
      );
    }
  });
  
  function getClientWidth(request) {
    const header = request.headers.get('Save-Data');
    const isDataSaver = header ? header.includes('on') : false;
    const viewport = request.headers.get('Viewport-Width') || 1920;
    return Math.min(viewport, isDataSaver ? 800 : 1920);
  }

  // script.js
async function fetchMembers() {
  const response = await fetch('members.json');
  const members = await response.json();
  
  return members.records; // Assuming JSON structure has "records" field.
}

function renderMembers(members, view) {
  const container = document.getElementById('members-container');
  
  container.className = view; // Set view mode (grid or list)
  
  container.innerHTML = ''; // Clear previous content
  
  members.forEach(member => {
      const card = document.createElement('div');
      card.className = 'member-card';
      
      card.innerHTML = `
          <img src="${member.image}" alt="${member.name}">
          <h4>${member.name}</h4>
          <p>${member.address}</p>
          <p>${member.phone}</p>
          <a href="${member.website}" target="_blank">${member.website}</a>
      `;
      
      container.appendChild(card);
  });
}

// Toggle between Grid and List views
document.getElementById('grid-view').addEventListener('click', () => renderMembers(membersData, 'grid'));
document.getElementById('list-view').addEventListener('click', () => renderMembers(membersData, 'list'));

// Fetch and display members on page load
let membersData = [];
fetchMembers().then(data => {
  membersData = data; // Store fetched data globally
  renderMembers(membersData, 'grid'); // Default view is grid
});
