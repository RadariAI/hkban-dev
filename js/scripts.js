function toggleNav() {
    const navTabs = document.querySelector('.nav-tabs');
    navTabs.classList.toggle('active');
}

function toggleDropdown(element) {
    const dropdownMenu = element.nextElementSibling.nextElementSibling; // Skip the img to get dropdown-menu
    dropdownMenu.classList.toggle('active');
}

function toggleNav() {
    const navTabs = document.querySelector('.nav-tabs');
    navTabs.classList.toggle('active');
}

function toggleDropdown(element) {
    const dropdownMenu = element.nextElementSibling.nextElementSibling;
    dropdownMenu.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelector('.slides');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    let currentSlide = 0;
    const totalSlides = slides.children.length; // 7 images
    let slideInterval = null;
    let animationFrame = null;

    // Smooth animation function
    function animateSlide(startPos, endPos, duration) {
        const startTime = performance.now();
        
        function step(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1); // 0 to 1
            const easeProgress = 1 - Math.pow(1 - progress, 2); // Ease-out effect
            const newPos = startPos + (endPos - startPos) * easeProgress;

            slides.style.transform = `translateX(${newPos}%)`;

            if (progress < 1) {
                animationFrame = requestAnimationFrame(step);
            } else {
                cancelAnimationFrame(animationFrame); // Clean up
            }
        }

        cancelAnimationFrame(animationFrame); // Cancel any ongoing animation
        animationFrame = requestAnimationFrame(step);
    }

    // Move to a specific slide with animation
    function goToSlide(index) {
        const startPos = -currentSlide * (100 / totalSlides);
        currentSlide = (index + totalSlides) % totalSlides; // Ensure index stays in bounds
        const endPos = -currentSlide * (100 / totalSlides);
        animateSlide(startPos, endPos, 500); // half-second animation
    }

    // Next slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // Previous slide
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Start auto-sliding
    function startSlideshow() {
        if (slideInterval !== null) {
            clearInterval(slideInterval);
        }
        slideInterval = setInterval(nextSlide, 5000); // 5 seconds
    }

    // Stop auto-sliding
    function stopSlideshow() {
        if (slideInterval !== null) {
            clearInterval(slideInterval);
            slideInterval = null;
        }
        cancelAnimationFrame(animationFrame); // Stop any ongoing animation
    }

    // Initial setup
    goToSlide(0);
    startSlideshow();

    // Pause on hover
    const slideshow = slides.parentElement;
    slideshow.addEventListener('mouseenter', stopSlideshow);
    slideshow.addEventListener('mouseleave', startSlideshow);

    // Arrow button controls
    nextArrow.addEventListener('click', () => {
        stopSlideshow(); // Pause slideshow on click
        nextSlide();
        // Optionally restart slideshow after a delay
        setTimeout(startSlideshow, 10000); // Resume after 10 seconds
    });

    prevArrow.addEventListener('click', () => {
        stopSlideshow(); // Pause slideshow on click
        prevSlide();
        // Optionally restart slideshow after a delay
        setTimeout(startSlideshow, 10000); // Resume after 10 seconds
    });
});