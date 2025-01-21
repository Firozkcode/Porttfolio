document.addEventListener('DOMContentLoaded', () => {
    "use strict";
  
    /**
     * Preloader
     */
    const preloader = document.querySelector('#preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          preloader.classList.add('loaded');
        }, 1000);
        setTimeout(() => {
          preloader.remove();
        }, 2000);
      });
    }
  
    /**
       * Scroll top button
       */
    const scrollTop = document.querySelector('.scroll-top');
    if (scrollTop) {
      const togglescrollTop = function() {
        window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
      }
      window.addEventListener('load', togglescrollTop);
      document.addEventListener('scroll', togglescrollTop);
      scrollTop.addEventListener('click', window.scrollTo({
        top: 0,
        behavior: 'smooth'
      }));
    }
  });



  const cards = document.querySelectorAll('.services-box');
  const RANGE = 40;
  
  const calcValue = (a, b) => {
      return (a / b * RANGE - RANGE / 2).toFixed(1);
  };
  
  cards.forEach((card) => {
      card.addEventListener('mousemove', (event) => {
          const rect = card.getBoundingClientRect();
          const yValue = calcValue(event.clientY - rect.top, rect.height);
          const xValue = calcValue(event.clientX - rect.left, rect.width);
  
          card.style.transform = `rotateX(${-yValue}deg) rotateY(${xValue}deg)`;
      });
  
      card.addEventListener('mouseleave', () => {
          card.style.transform = 'rotateX(0deg) rotateY(0deg)';
          card.style.transition = 'transform 0.3s ease-out'; // Smooth reset transition
      });
  
      card.addEventListener('mouseenter', () => {
          card.style.transition = 'none'; // Remove transition on re-enter
      });
  });


  let menuIcon = document.querySelector('#menu-icon');
  let navbar = document.querySelector('.navbar');
  
  // Toggle the menu and navbar active class
  menuIcon.onclick = () => {
      menuIcon.classList.toggle('bx-x');
      navbar.classList.toggle('active');
  };
  
  // Close the navbar if clicked outside
  document.addEventListener('click', (event) => {
      if (!menuIcon.contains(event.target) && !navbar.contains(event.target)) {
          menuIcon.classList.remove('bx-x');
          navbar.classList.remove('active');
      }
  });
  
/*=====dark light mode=====*/
let darkModeIcon = document.querySelector('#darkMode-icon');

darkModeIcon.addEventListener("click", () => {
    darkModeIcon.classList.toggle('bx-sun');
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark-mode");
      } else {
        localStorage.setItem("theme", "light");
      }
});

function themeMode() {
    if (localStorage.getItem("theme") !== null) {
      if (localStorage.getItem("theme") === "light") {
        document.body.classList.remove("dark-mode");
      } else {
        document.body.classList.add("dark-mode");
      }
    }
  }

themeMode();

function hideLogo() {
  try {
      // Get all spline-viewer elements on the page
      const splineViewers = document.querySelectorAll('spline-viewer');

      // Loop through each spline-viewer element
      splineViewers.forEach(spline => {
          const shadowRoot = spline.shadowRoot;
          if (shadowRoot) {
              const logo = shadowRoot.querySelector('#logo');
              if (logo) {
                  logo.style.display = 'none';
              }
          }
      });
  } catch (e) {
      console.error('Error hiding logo:', e);
  }

  requestAnimationFrame(hideLogo);  // Continuously check and hide the logo
}

hideLogo();


  // Function to set the theme color and store it in localStorage
  function setThemeColor(color) {
    document.querySelector(':root').style.setProperty('--main-color', color);
    document.getElementById("colorPicker").value = color; // Update color picker value
    document.getElementById("colorCode").textContent = `Color Code: ${color}`;
    localStorage.setItem('themeColor', color); // Store color in localStorage
}

// Retrieve and apply the stored theme color from localStorage on page load
window.addEventListener('load', () => {
    const savedColor = localStorage.getItem('themeColor');
    if (savedColor) {
        setThemeColor(savedColor); // Apply saved color if it exists
    } else {
        setThemeColor('#ffc312'); // Default color if no color is saved
    }
});

// Toggle color switcher panel
const switcherBtn = document.querySelector('.switcher-btn');
const colorSwitcher = document.querySelector('.color-switcher');

// Toggle the `active` class on .switcher-btn and .color-switcher
switcherBtn.onclick = (event) => {
    event.stopPropagation(); // Prevent the click from bubbling up
    switcherBtn.classList.toggle('active');
    colorSwitcher.classList.toggle('active');
};

// Remove the `active` class when clicking outside the .color-switcher
document.addEventListener('click', (event) => {
    if (!colorSwitcher.contains(event.target) && !switcherBtn.contains(event.target)) {
        switcherBtn.classList.remove('active');
        colorSwitcher.classList.remove('active');
    }
});

// Handle predefined theme buttons
let themeButtons = document.querySelectorAll('.theme-buttons');

themeButtons.forEach(color => {
    color.addEventListener('click', () => {
        let dataColor = color.getAttribute('data-color');
        setThemeColor(dataColor); // Set theme color using predefined button
    });
});

// Handle color picker change
document.getElementById("colorPicker").addEventListener('input', function(event) {
    const selectedColor = event.target.value;
    setThemeColor(selectedColor); // Set theme color using color picker
});


 /*=====sticky slections active line=====*/
 document.addEventListener('DOMContentLoaded', (event) => {
  let sections = document.querySelectorAll('section');
  let navlinks = document.querySelectorAll('header nav a');

  window.onscroll = () => {
      sections.forEach(sec => {
          let top = window.scrollY;
          let offset = sec.offsetTop - 150;
          let height = sec.offsetHeight;
          let id = sec.getAttribute('id');

          if (top >= offset && top < offset + height) {
              navlinks.forEach(links => {
                  links.classList.remove('active');
                  document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
              });
          }
      });
  };
});


/*=====swiper reveal=====*/
ScrollReveal({
  reset: true,
  distance: '80px',
  duration: 2000,
  delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top'});
ScrollReveal().reveal('.home-img img, .services-container, .portfolio-box, .testimonial-wrapper, .contact form', { origin: 'bottom'});
ScrollReveal().reveal('.home-content h1, .about-img img', { origin: 'left'});
ScrollReveal().reveal('.home-content h3, .home-content p, .about-content', { origin: 'right'});



  

 
  