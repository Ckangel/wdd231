const tabButtons = document.querySelectorAll('.tab-button');
const dashboardContents = document.querySelectorAll('.dashboard-content');
const editProfileModal = document.getElementById('editProfileModal');
const uploadResumeModal = document.getElementById('uploadResumeModal');
const postJobModal = document.getElementById('postJobModal');
const closeButtons = document.querySelectorAll('.modal .close-button');
const editProfileButton = document.querySelector('.edit-profile-button');
const uploadResumeButton = document.querySelector('.upload-resume-button');
const postJobButton = document.querySelector('.post-job-button');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tab = button.getAttribute('data-tab');
        tabButtons.forEach(btn => btn.classList.remove('active'));
        dashboardContents.forEach(content => content.classList.remove('active'));
        button.classList.add('active');
        document.getElementById(tab).classList.add('active');
    });
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        if (modal) {
            modal.style.display = 'none';
        }
    });
});

window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
});

if (editProfileButton && editProfileModal) {
    editProfileButton.addEventListener('click', () => {
        editProfileModal.style.display = 'block';
    });
}

if (uploadResumeButton && uploadResumeModal) {
    uploadResumeButton.addEventListener('click', () => {
        uploadResumeModal.style.display = 'block';
    });
}

if (postJobButton && postJobModal) {
    postJobButton.addEventListener('click', () => {
        postJobModal.style.display = 'block';
    });
}