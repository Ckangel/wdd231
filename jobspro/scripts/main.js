export function selectElement(selector) {
    return document.querySelector(selector);
}

export function createElement(tag, className = '', textContent = '') {
    const element = document.createElement(tag);
    if (className) {
        element.classList.add(className);
    }
    if (textContent) {
        element.textContent = textContent;
    }
    return element;
}

export function modifyElement(element, newTextContent) {
    if (element) {
        element.textContent = newTextContent;
    }
}

export function addEventListenerToElement(element, eventType, callback) {
    if (element) {
        element.addEventListener(eventType, callback);
    }
}

export function displayModal(modalId) {
    const modal = selectElement(`#${modalId}`);
    if (modal) {
        modal.style.display = "block";
    }
}

export function closeModal(modalId) {
    const modal = selectElement(`#${modalId}`);
    if (modal) {
        modal.style.display = "none";
    }
}

const searchButton = document.querySelector('.hero button');
const searchModal = document.getElementById('searchModal');
const closeButton = document.querySelector('.close-button');

searchButton.addEventListener('click', () => {
    searchModal.style.display = 'block';
});

closeButton.addEventListener('click', () => {
    searchModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target == searchModal) {
        searchModal.style.display = 'none';
    }
});