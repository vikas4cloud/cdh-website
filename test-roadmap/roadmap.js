// script.js

// Manually set this flag to true or false
const isAdmin = false; // Change to false to simulate viewer mode

// Function to get progress from localStorage or default to all unchecked
function getProgress() {
    const progress = JSON.parse(localStorage.getItem('courseProgress'));
    if (progress) {
        return progress;
    }
    // Default progress (all unchecked)
    const checkboxes = document.querySelectorAll('.topic-checkbox');
    return Array.from(checkboxes).map(cb => cb.checked);
}

// Function to set progress in localStorage
function setProgress() {
    const checkboxes = document.querySelectorAll('.topic-checkbox');
    const progress = Array.from(checkboxes).map(cb => cb.checked);
    localStorage.setItem('courseProgress', JSON.stringify(progress));
}

// Function to initialize the page based on the user role
function setupPage() {
    if (isAdmin) {
        document.body.classList.add('admin');
        document.body.classList.remove('viewer');
    } else {
        document.body.classList.add('viewer');
        document.body.classList.remove('admin');
    }

    // Get saved progress from localStorage and apply it
    const savedProgress = getProgress();
    const checkboxes = document.querySelectorAll('.topic-checkbox');
    checkboxes.forEach((cb, index) => {
        cb.checked = savedProgress[index];
    });

    // Function to update the progress bar
    function updateProgress() {
        const checkboxes = document.querySelectorAll('.topic-checkbox');
        const total = checkboxes.length;
        const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
        const progress = (checked / total) * 100;

        // Update the width of the progress bar and text percentage
        const progressBar = document.getElementById('progress-bar');
        const progressPercent = document.getElementById('progress-percent');
        
        progressBar.style.width = progress + '%';
        progressPercent.textContent = Math.round(progress) + '%';
    }

    // Add or remove event listeners based on role
    if (isAdmin) {
        document.querySelectorAll('.topic-checkbox').forEach(cb => {
            cb.addEventListener('change', () => {
                setProgress();
                updateProgress();
            });
        });
    } else {
        document.querySelectorAll('.topic-checkbox').forEach(cb => {
            cb.addEventListener('change', () => {
                // Prevent changing checkbox states in viewer mode
                cb.checked = !cb.checked;
            });
        });
    }

    // Update the progress bar initially
    updateProgress();

    // Accordion functionality
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            content.classList.toggle('expanded');
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
    });
}

// Run setup
document.addEventListener('DOMContentLoaded', setupPage);
