function createGrid(size = 16) {
    const container = document.querySelector('.container');
    const totalSquares = size * size;
    container.innerHTML = '';

    // Set CSS variable for grid size (for your CSS grid layout)
    container.style.setProperty('--grid-size', size);

    // Create all squares
    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement('div');
        square.classList.add('grid-square');
        container.appendChild(square);
    }

    // Helper function to color a square
    const colorSquare = (square) => {
        const rand = () => Math.floor(Math.random() * 206) + 50;
        square.style.backgroundColor ||= `rgb(${rand()}, ${rand()}, ${rand()})`;
        square.style.opacity ||= '0';
        square.style.opacity = Math.min(parseFloat(square.style.opacity) + 0.1, 1).toString();
    };

    // Mouse hover for desktop
    container.querySelectorAll('.grid-square').forEach(square => {
        square.addEventListener('mouseover', () => colorSquare(square));
    });

    // Touch drag for mobile
    container.addEventListener('touchmove', (e) => {
        e.preventDefault(); // prevent page scrolling
        for (const touch of e.touches) {
            const el = document.elementFromPoint(touch.clientX, touch.clientY);
            if (el && el.classList.contains('grid-square')) {
                colorSquare(el);
            }
        }
    }, { passive: false }); // passive: false needed to allow preventDefault
}

// Initialize grid on page load
document.addEventListener('DOMContentLoaded', () => createGrid());

// Reset button
const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', () => {
    const newSize = prompt("Enter new grid size (max 100):", 16);
    if (newSize === null) {
        return;
    }
    const size = Math.min(Math.max(parseInt(newSize), 1), 100);
    createGrid(size);
});
