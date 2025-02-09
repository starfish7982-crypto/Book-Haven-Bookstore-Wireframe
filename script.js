// Toggle mobile menu
document.querySelector('.menu-toggle')?.addEventListener('click', () => {
    // Add mobile menu functionality here
    console.log('Menu toggle clicked');
});

// Search functionality
document.querySelector('.search-bar button')?.addEventListener('click', () => {
    const searchInput = document.querySelector('.search-bar input');
    console.log('Search query:', searchInput.value);
});