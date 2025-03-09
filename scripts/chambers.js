document.addEventListener('DOMContentLoaded', function() {
    // Hamburger Menu
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');
    if (hamburger && menu) {
        hamburger.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
    }

    // Course Data
    const courses = [
        {
            subject: 'CSE',
            number: 110,
            title: 'Introduction to Programming',
            credits: 2,
            technology: ['Python'],
            completed: false
        },
        {
            subject: 'WDD',
            number: 130,
            title: 'Web Fundamentals',
            credits: 2,
            technology: ['HTML', 'CSS'],
            completed: false
        },
        {
            subject: 'CSE',
            number: 111,
            title: 'Programming with Functions',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
            technology: [
                'Python'
            ],
            completed: false
        },
        {
            subject: 'CSE',
            number: 210,
            title: 'Programming with Classes',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
            technology: [
                'C#'
            ],
            completed: false
        },
        {
            subject: 'WDD',
            number: 131,
            title: 'Dynamic Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
            technology: [
                'HTML',
                'CSS',
                'JavaScript'
            ],
            completed: false
        },
        {
            subject: 'WDD',
            number: 231,
            title: 'Frontend Web Development I',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
            technology: [
                'HTML',
                'CSS',
                'JavaScript'
            ],
            completed: false
        }
    ]

    // DOM Elements
    const filterButtons = document.querySelectorAll('.filter-btn');
    const coursesContainer = document.getElementById('courses-container');
    const totalCreditsSpan = document.getElementById('total-credits');
    let currentFilter = 'all';

    // Filter Functions
    const filterCourses = {
        all: () => courses,
        WDD: () => courses.filter(c => c.subject === 'WDD'),
        CSE: () => courses.filter(c => c.subject === 'CSE')
    };

    // Render Courses
    function renderCourses() {
        coursesContainer.innerHTML = '';
        const filtered = filterCourses[currentFilter]();
        
        filtered.forEach(course => {
            const card = document.createElement('div');
            card.className = `course-card ${course.completed ? 'completed' : ''}`;
            card.innerHTML = `
                <h3>${course.subject} ${course.number}</h3>
                <p>${course.title}</p>
                <p>Credits: ${course.credits}</p>
                <p>Technologies: ${course.technology.join(', ')}</p>
                <p>Status: ${course.completed ? '✓ Completed' : 'In Progress'}</p>
            `;
            coursesContainer.appendChild(card);
        });
    }

    // Update Credits
    function updateCredits() {
        const filtered = filterCourses[currentFilter]();
        totalCreditsSpan.textContent = filtered.reduce((sum, course) => sum + course.credits, 0);
    }

    // Filter Button Events
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            currentFilter = this.dataset.filter;
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            renderCourses();
            updateCredits();
        });
    });

    // Navigation Links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Initial Render
    renderCourses();
    updateCredits();
});

// Footer Information
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;
