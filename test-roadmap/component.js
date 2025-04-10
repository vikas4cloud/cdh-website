const milestones = document.querySelectorAll('.milestone');
const tooltip = document.getElementById('tooltip');
const tooltipTitle = document.getElementById('tooltip-title');
const tooltipDescription = document.getElementById('tooltip-description');

milestones.forEach((milestone) => {
    milestone.addEventListener('mouseenter', function () {
        const title = milestone.getAttribute('data-title');
        const description = milestone.getAttribute('data-description');

        tooltipTitle.textContent = title;
        tooltipDescription.textContent = description;

        const rect = milestone.getBoundingClientRect();
        const xPos = rect.left + window.scrollX;
        const yPos = rect.top + window.scrollY;

        tooltip.style.left = `${xPos}px`;
        tooltip.style.top = `${yPos - 60}px`;
        tooltip.style.visibility = 'visible';
        tooltip.style.opacity = '1';
    });

    milestone.addEventListener('mouseleave', function () {
        tooltip.style.visibility = 'hidden';
        tooltip.style.opacity = '0';
    });
});
