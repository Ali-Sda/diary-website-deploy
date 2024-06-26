let currentSlide = 0;
// 1
function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    const offset = -currentSlide * 100;
    document.querySelector('.slides').style.transform = `translateX(${offset}%)`;
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
}
// Auto slide functionality (optional)
// setInterval(() => {
    // changeSlide(1);
// }, 5000); // Change image every 3 seconds

// Initialize the first slide
showSlide(currentSlide);
