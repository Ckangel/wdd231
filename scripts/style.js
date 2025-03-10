document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');
    
    if (hamburger && menu) {
        hamburger.addEventListener('click', () => {
            menu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Navigation
    const currentPage = location.pathname.split('/').pop();
    document.querySelectorAll('.nav-item').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Course Data and Filtering
    const courses = [/* your existing course data */];

    const DOM = {
        filterButtons: document.querySelectorAll('.filter-btn'),
        coursesContainer: document.getElementById('courses-container'),
        totalCredits: document.getElementById('total-credits'),
        year: document.getElementById('year'),
        lastModified: document.getElementById('last-modified')
    };

    // Filter Config
    const filters = {
        current: 'all',
        types: {
            all: () => courses,
            WDD: () => courses.filter(c => c.subject === 'WDD'),
            CSE: () => courses.filter(c => c.subject === 'CSE')
        }
    };

    // Course Rendering
    function createCourseCard(course) {
        const card = document.createElement('div');
        card.className = `course-card ${course.completed ? 'completed' : ''}`;
        card.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p>${course.title}</p>
            <p>Credits: ${course.credits}</p>
            <p>Technologies: ${course.technology.join(', ')}</p>
            <p>Status: ${course.completed ? '✓ Completed' : 'In Progress'}</p>
        `;
        return card;
    }

    function renderCourses() {
        DOM.coursesContainer.innerHTML = '';
        const filtered = filters.types[filters.current]();
        filtered.forEach(course => {
            DOM.coursesContainer.appendChild(createCourseCard(course));
        });
        updateCredits();
    }

    function updateCredits() {
        const total = filters.types[filters.current]()
            .reduce((sum, course) => sum + course.credits, 0);
        DOM.totalCredits.textContent = total;
    }

    // Filter Handlers
    DOM.filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filters.current = this.dataset.filter;
            DOM.filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            renderCourses();
        });
    });

    // Footer
    DOM.year.textContent = new Date().getFullYear();
    DOM.lastModified.textContent = document.lastModified;

    // Initialization
    renderCourses();
});
