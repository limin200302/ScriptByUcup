// JavaScript to handle game icon selection and slider movement
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('slider');
  const gameItems = document.querySelectorAll('.game-item');
  
  // Function to highlight the active item
  gameItems.forEach(item => {
    item.addEventListener('click', () => {
      gameItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // Function for slider navigation (Swipe left/right)
  let currentIndex = 0;
  const totalItems = gameItems.length;
  
  // Swipe left (move slider left)
  const swipeLeft = () => {
    if (currentIndex > 0) {
      currentIndex--;
      slider.style.transform = `translateX(-${currentIndex * 220}px)`;
    }
  };

  // Swipe right (move slider right)
  const swipeRight = () => {
    if (currentIndex < totalItems - 1) {
      currentIndex++;
      slider.style.transform = `translateX(-${currentIndex * 220}px)`;
    }
  };

  // Add swipe controls (optional, you can replace it with buttons)
  setInterval(swipeRight, 3000); // Automatically swipe every 3 seconds (for demo purpose)
});
