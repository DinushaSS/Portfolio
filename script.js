/**
 * DINUSHA SANDAKELUM - PORTFOLIO MASTER SCRIPT
 * Handles Navigation, Mobile Menu, and Interaction
 */

// --- 1. NAVIGATION CONTROL (SHRINK ON SCROLL) ---
function handleScroll() {
  const desktopNav = document.getElementById("desktop-nav");
  const hamburgerNav = document.getElementById("hamburger-nav");

  // Apply "shrunk" class if page is scrolled down more than 50px
  if (window.scrollY > 50) {
    if (desktopNav) desktopNav.classList.add("shrunk");
    if (hamburgerNav) hamburgerNav.classList.add("shrunk");
  } else {
    if (desktopNav) desktopNav.classList.remove("shrunk");
    if (hamburgerNav) hamburgerNav.classList.remove("shrunk");
  }
}

// Listen for scroll events
window.addEventListener("scroll", handleScroll);

// Also run on page load (Fixes state if page is refreshed while scrolled)
window.addEventListener("load", handleScroll);

// --- 2. MOBILE HAMBURGER MENU TOGGLE ---
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");

  if (menu && icon) {
    menu.classList.toggle("open");
    icon.classList.toggle("open");
  }
}

// --- 3. AUTO-CLOSE MOBILE MENU ---
// Closes the dropdown automatically when a user clicks a link
document.addEventListener("click", function (event) {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  const isClickInsideMenu = menu.contains(event.target);
  const isClickOnIcon = icon.contains(event.target);

  // If the menu is open and the user clicks a link or outside the menu, close it
  if (menu.classList.contains("open") && !isClickOnIcon) {
    menu.classList.remove("open");
    icon.classList.remove("open");
  }
});

// --- 4. SMOOTH SCROLL OFFSET FIX ---
// Ensures that when clicking a link, the fixed header doesn't cover the section title
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const navHeight = document.querySelector("#desktop-nav").offsetHeight;
      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset -
        navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// --- 6. PROJECT MODAL LOGIC ---
function openProjectModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.showModal(); // This is the built-in function for <dialog>
    document.body.style.overflow = "hidden"; // Prevents background scrolling
  }
}

function closeProjectModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.close(); // Closes the <dialog>
    document.body.style.overflow = "auto"; // Re-enables scrolling
  }
}

// Close modal if user clicks the dark background (outside the box)
document.querySelectorAll(".project-modal").forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeProjectModal(modal.id);
    }
  });
});
