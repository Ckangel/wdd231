const jobList = document.getElementById('jobList');
const jobDetailsModal = document.getElementById('jobDetailsModal');
const modalCloseButton = jobDetailsModal.querySelector('.close-button');
const modalTitle = jobDetailsModal.querySelector('#jobTitle');
const modalCompany = jobDetailsModal.querySelector('#company');
const modalLocation = jobDetailsModal.querySelector('#location');
const modalDescription = jobDetailsModal.querySelector('#description');

// Sample job data (replace with actual data fetching later)
const jobs = [
    { id: 1, title: 'Remote Web Developer', company: 'Tech Solutions Inc.', location: 'Global', description: 'Full-stack web development role...', category: 'Technology' },
    { id: 2, title: 'Marketing Manager', company: 'Creative Agency Ltd.', location: 'Accra', description: 'Lead marketing campaigns...', category: 'Marketing' },
    { id: 3, title: 'Sales Representative', company: 'Salesforce Ghana', location: 'Tema', description: 'Drive sales and build client relationships...', category: 'Sales' },
    { id: 4, title: 'Financial Analyst', company: 'Finance Corp.', location: 'Remote', description: 'Analyze financial data and provide reports...', category: 'Finance' },
    // Add more job listings here
];

function displayJobs(jobsToDisplay) {
    jobList.innerHTML = '';
    jobsToDisplay.forEach(job => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="job-info">
                <h3>${job.title}</h3>
                <p class="job-meta">${job.company} - ${job.location}</p>
            </div>
            <button class="view-details-button" data-job-id="${job.id}">View Details</button>
        `;
        jobList.appendChild(listItem);
    });

    const viewDetailsButtons = document.querySelectorAll('.view-details-button');
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', () => {
            const jobId = parseInt(button.getAttribute('data-job-id'));
            const selectedJob = jobs.find(job => job.id === jobId);
            if (selectedJob) {
                openJobDetailsModal(selectedJob);
            }
        });
    });
}

function openJobDetailsModal(job) {
    modalTitle.textContent = job.title;
    modalCompany.textContent = job.company;
    modalLocation.textContent = job.location;
    modalDescription.textContent = job.description;
    jobDetailsModal.style.display = 'block';
}

modalCloseButton.addEventListener('click', () => {
    jobDetailsModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target == jobDetailsModal) {
        jobDetailsModal.style.display = 'none';
    }
});

const filterForm = document.getElementById('filterForm');
filterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const category = document.getElementById('category').value;

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = searchTerm ? job.title.toLowerCase().includes(searchTerm) || job.company.toLowerCase().includes(searchTerm) || job.description.toLowerCase().includes(searchTerm) : true;
        const matchesCategory = category ? job.category === category : true;
        return matchesSearch && matchesCategory;
    });
    displayJobs(filteredJobs);
});

// Initial display of jobs
displayJobs(jobs);