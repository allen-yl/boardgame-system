// Utility functions for the board game website

// Function to format a date to a readable string
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
}

// Function to validate if a string is not empty
function isNotEmpty(str) {
    return str && str.trim().length > 0;
}

// Function to generate a unique ID
function generateUniqueId() {
    return 'id-' + Math.random().toString(36).substr(2, 16);
}

// Function to debounce a function call
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}

// Function to deep clone an object
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}