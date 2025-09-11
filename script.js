function createGrid(size = 16) {
    const container = document.querySelector('.container');
    const totalSquares = size * size;
    container.innerHTML = '';

    // Set CSS variable for grid size
    container.style.setProperty('--grid-size', size);

    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement('div');
        square.classList.add('grid-square');

        square.addEventListener('mouseover', () => {
            const rand = () => Math.floor(Math.random() * 206) + 50; // 50–255
            square.style.backgroundColor ||= `rgb(${rand()}, ${rand()}, ${rand()})`;
            square.style.opacity ||= '0';
            square.style.opacity = Math.min(parseFloat(square.style.opacity) + 0.1, 1).toString();
        });

        container.appendChild(square);
    }
}

document.addEventListener('DOMContentLoaded', createGrid());

const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', () => {
    const newSize = prompt("Enter new grid size (max 100):", 16);
    const size = Math.min(Math.max(parseInt(newSize), 1), 100);
    createGrid(size);
});