document.addEventListener('DOMContentLoaded', function() {
    // Set current date in hidden field
    const today = new Date();
    document.getElementById('submit-date').value = today.toISOString().split('T')[0];
    
    // Modal functionality
    const modals = document.querySelectorAll('.modal');
    const modalBtns = document.querySelectorAll('.learn-more');
    const closeBtns = document.querySelectorAll('.close');
    
    // Open modal when Learn More button is clicked
    modalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            document.getElementById(modalId).style.display = 'block';
        });
        
        // Keyboard accessibility
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const modalId = btn.getAttribute('data-modal');
                document.getElementById(modalId).style.display = 'block';
            }
        });
    });
    
    // Close modal when X is clicked
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal').style.display = 'none';
        });
    });
    
    // Close modal when clicking outside content
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
    
    // Close modal with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
        }
    });
    
    // Form submission
    const form = document.getElementById('membership-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const params = new URLSearchParams();
        
        // Add required fields to URL params
        formData.forEach((value, key) => {
            if (value && form.elements[key].required) {
                params.append(key, value);
            }
        });
        
        // Redirect to thank you page with form data
        window.location.href = `thankyou.html?${params.toString()}`;
    });
});