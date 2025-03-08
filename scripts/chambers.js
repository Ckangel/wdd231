document.getElementById('hamburger').addEventListener('click', function() {
    document.getElementById('menu').classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-buttons button');
    const courseButtons = document.querySelectorAll('.course-button');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;

            // Update active button state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Show/hide courses based on filter
            courseButtons.forEach(course => {
                if (filter === 'all' || course.classList.contains(filter)) {
                    course.style.display = 'inline-block'; // Or whatever display style you want
                } else {
                    course.style.display = 'none';
                }
            });
        });
    });
});
