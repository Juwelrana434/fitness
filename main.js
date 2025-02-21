// Mobile menu functionality
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
let isMenuOpen = false;

menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    isMenuOpen = !isMenuOpen;
    mobileMenu.classList.toggle('hidden');
});



// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (isMenuOpen && !mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        mobileMenu.classList.add('hidden');
        isMenuOpen = false;
    }
});

// Close mobile menu when clicking on a link
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        isMenuOpen = false;
    });
});

// Initialize AOS (Animate On Scroll) with enhanced settings
AOS.init({
    duration: 1000,
    easing: 'ease-out-cubic',
    once: false,
    mirror: true,
    offset: 50,
    anchorPlacement: 'top-bottom'
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Sticky navigation
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.classList.add('shadow-lg');
    } else {
        nav.classList.remove('shadow-lg');
    }
});

// Form submission handler for contact forms
// document.addEventListener('DOMContentLoaded', () => {
//     const forms = document.querySelectorAll('form');
//     forms.forEach(form => {
//         form.addEventListener('submit', (e) => {
//             e.preventDefault();
//             // Add your form submission logic here
//             alert('Thank you for your interest! We will contact you soon.');
//             form.reset();
//         });
//     });
// });

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        // Here you would typically send the data to your backend
        // For now, we'll just show a success message
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Program card hover effects
const programCards = document.querySelectorAll('#programs .bg-white');
programCards.forEach(card => {
    card.classList.add('hover-scale');
});

// Testimonial slider (if needed)
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('#testimonials .bg-gray-100');

function showNextTestimonial() {
    testimonials[currentTestimonial].style.opacity = '0';
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    testimonials[currentTestimonial].style.opacity = '1';
}

// Uncomment to enable auto-sliding testimonials
// setInterval(showNextTestimonial, 5000);

// Success Stories Infinite Scroll
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('successStoriesSlider');
    if (!slider) return;

    // Clone the testimonials and append them to create infinite scroll effect
    const testimonials = Array.from(slider.children);
    testimonials.forEach(testimonial => {
        const clone = testimonial.cloneNode(true);
        slider.appendChild(clone);
    });

    // Create Intersection Observer to handle infinite scroll
    const observerOptions = {
        root: slider,
        threshold: 0.1
    };

    const handleIntersection = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentScroll = slider.scrollLeft;
                const maxScroll = slider.scrollWidth / 2;
                
                // If we've scrolled past the first set of items
                if (currentScroll >= maxScroll) {
                    // Reset to the start without animation
                    slider.style.scrollBehavior = 'auto';
                    slider.scrollLeft = 0;
                    slider.style.scrollBehavior = 'smooth';
                }
            }
        });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Observe the last clone to trigger reset
    const lastClone = slider.lastElementChild;
    observer.observe(lastClone);

    // Auto scroll functionality
    let autoScrollInterval;
    const startAutoScroll = () => {
        autoScrollInterval = setInterval(() => {
            const currentScroll = slider.scrollLeft;
            const scrollAmount = 2; // Adjust speed by changing this value
            slider.scrollBy({
                left: scrollAmount,
                behavior: 'auto'
            });
        }, 1500); // Adjust interval for smoother/faster scrolling
    };

    const stopAutoScroll = () => {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
        }
    };

    // Start auto-scroll by default
    startAutoScroll();

    // Pause on hover
    slider.addEventListener('mouseenter', stopAutoScroll);
    slider.addEventListener('mouseleave', startAutoScroll);

    // Pause on touch for mobile devices
    slider.addEventListener('touchstart', stopAutoScroll);
    slider.addEventListener('touchend', startAutoScroll);

    // Stop auto-scroll when user manually scrolls
    let userScrolling = false;
    let scrollTimeout;

    slider.addEventListener('wheel', () => {
        userScrolling = true;
        stopAutoScroll();
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            userScrolling = false;
            startAutoScroll();
        }, 1500); // Resume auto-scroll after 1.5 seconds of no user interaction
    });
});

function scrollSlider(direction) {
    const slider = document.getElementById('successStoriesSlider');
    const scrollAmount = direction === 'left' ? -600 : 600;
    slider.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
}

// Trainers slider functionality
let trainersAutoScrollInterval;

function startTrainersAutoScroll() {
    const slider = document.getElementById('trainersSlider');
    if (!slider) return;

    trainersAutoScrollInterval = setInterval(() => {
        // Get the scroll position and width
        const scrollLeft = slider.scrollLeft;
        const scrollWidth = slider.scrollWidth;
        const clientWidth = slider.clientWidth;

        // Calculate next scroll position
        let nextScrollLeft = scrollLeft + 400; // Same as manual scroll amount

        // If we're at the end, instantly jump to start
        if (scrollLeft >= scrollWidth - clientWidth) {
            slider.scrollTo({ left: 0 });
            nextScrollLeft = 400;
        }

        // Perform the scroll
        slider.scrollTo({
            left: nextScrollLeft,
            behavior: 'smooth'
        });
    }, 1500); // Scroll every 1.5 seconds
}

function scrollTrainers(direction) {
    const slider = document.getElementById('trainersSlider');
    const scrollAmount = 400;
    const currentScroll = slider.scrollLeft;
    const maxScroll = slider.scrollWidth - slider.clientWidth;

    let nextScroll;
    if (direction === 'left') {
        nextScroll = currentScroll - scrollAmount;
        if (nextScroll < 0) {
            // If scrolling past the start, jump to end
            slider.scrollTo({ left: maxScroll });
            nextScroll = maxScroll - scrollAmount;
        }
    } else {
        nextScroll = currentScroll + scrollAmount;
        if (nextScroll > maxScroll) {
            // If scrolling past the end, jump to start
            slider.scrollTo({ left: 0 });
            nextScroll = scrollAmount;
        }
    }

    slider.scrollTo({
        left: nextScroll,
        behavior: 'smooth'
    });
}

// Initialize auto-scroll
document.addEventListener('DOMContentLoaded', function() {
    const trainersSlider = document.getElementById('trainersSlider');
    if (trainersSlider) {
        // Mouse wheel handling with loop
        trainersSlider.addEventListener('wheel', (e) => {
            e.preventDefault();
            const maxScroll = trainersSlider.scrollWidth - trainersSlider.clientWidth;
            let nextScroll = trainersSlider.scrollLeft + e.deltaY;

            if (nextScroll > maxScroll) {
                trainersSlider.scrollTo({ left: 0 });
            } else if (nextScroll < 0) {
                trainersSlider.scrollTo({ left: maxScroll });
            } else {
                trainersSlider.scrollLeft = nextScroll;
            }
        });

        // Start auto-scroll immediately
        startTrainersAutoScroll();
    }
});

// Keep auto-scroll running even when page is hidden/inactive
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(trainersAutoScrollInterval);
    } else {
        startTrainersAutoScroll();
    }
});

// Hide scrollbar but keep functionality
document.addEventListener('DOMContentLoaded', function() {
    const trainersSlider = document.getElementById('trainersSlider');
    if (trainersSlider) {
        trainersSlider.addEventListener('wheel', (e) => {
            e.preventDefault();
            trainersSlider.scrollLeft += e.deltaY;
        });
    }
});

// Add CSS to hide scrollbar but keep functionality
const style = document.createElement('style');
style.textContent = `
    .hide-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    .hide-scrollbar::-webkit-scrollbar {
        display: none;
    }
`;
document.head.appendChild(style);

// Navigation active state
function setActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize active nav state
document.addEventListener('DOMContentLoaded', function() {
    setActiveNavLink();
});

// Add scroll event for navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('nav-scrolled');
    } else {
        nav.classList.remove('nav-scrolled');
    }
});

// Add active state to nav links based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Join Now Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('joinModal');
    const form = document.getElementById('joinForm');

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Show success message
        form.innerHTML = `
            <div class="text-center">
                <svg class="w-16 h-16 mx-auto text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <h3 class="text-xl font-bold mb-2">Thank You for Joining!</h3>
                <p class="text-gray-600 mb-4">We'll contact you soon to get started on your fitness journey.</p>
                <button onclick="closeModal()" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                    Close
                </button>
            </div>
        `;

        // Reset form after 3 seconds when modal is closed
        setTimeout(() => {
            form.reset();
            form.innerHTML = document.getElementById('joinForm').innerHTML;
        }, 3000);
    });

    // Handle escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});
