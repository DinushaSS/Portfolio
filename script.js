/**
 * DINUSHA SANDAKELUM - FINAL MASTER SCRIPT
 */

let currentProjectPage = 1;
const recordsPerPage = 6;

// --- 1. CORE NAVIGATION LOGIC ---
function handleScroll() {
  const desktopNav = document.getElementById("desktop-nav");
  const hamburgerNav = document.getElementById("hamburger-nav");
  const backToTopBtn = document.getElementById("back-to-top");

  if (window.scrollY > 50) {
    desktopNav?.classList.add("shrunk");
    hamburgerNav?.classList.add("shrunk");
  } else {
    desktopNav?.classList.remove("shrunk");
    hamburgerNav?.classList.remove("shrunk");
  }

  if (backToTopBtn) {
    backToTopBtn.style.display = window.scrollY > 400 ? "flex" : "none";
  }
}

// --- 2. MODAL CONTROLS ---
function openProjectModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.showModal();
    document.body.style.overflow = "hidden";
  }
}

function closeProjectModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.close();
    document.body.style.overflow = "auto";
  }
}

// --- 3. PAGINATION SYSTEM ---
function renderProjects() {
  const projects = document.getElementsByClassName("project-item");
  const wrapper = document.getElementById("page-numbers-wrapper");
  const prevBtn = document.getElementById("btn-prev");
  const nextBtn = document.getElementById("btn-next");

  if (!projects.length) return;

  const totalPages = Math.ceil(projects.length / recordsPerPage);

  // Hide/Show specific cards
  for (let i = 0; i < projects.length; i++) {
    projects[i].style.display = "none";
    if (
      i >= (currentProjectPage - 1) * recordsPerPage &&
      i < currentProjectPage * recordsPerPage
    ) {
      projects[i].style.display = "flex";
    }
  }

  // Generate circular page numbers
  if (wrapper) {
    wrapper.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement("button");
      pageBtn.className = `page-num ${
        i === currentProjectPage ? "active" : ""
      }`;
      pageBtn.innerText = i;
      pageBtn.onclick = () => {
        currentProjectPage = i;
        renderProjects();
        document
          .getElementById("projects")
          .scrollIntoView({ behavior: "smooth" });
      };
      wrapper.appendChild(pageBtn);
    }
  }

  // Toggle Arrow visibility
  if (prevBtn)
    prevBtn.style.visibility = currentProjectPage === 1 ? "hidden" : "visible";
  if (nextBtn)
    nextBtn.style.visibility =
      currentProjectPage === totalPages ? "hidden" : "visible";
}

function prevPage() {
  if (currentProjectPage > 1) {
    currentProjectPage--;
    renderProjects();
    document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
  }
}

function nextPage() {
  const projects = document.getElementsByClassName("project-item");
  if (currentProjectPage < Math.ceil(projects.length / recordsPerPage)) {
    currentProjectPage++;
    renderProjects();
    document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
  }
}

// --- 4. UTILITIES ---
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// --- 5. INITIALIZE ---
window.addEventListener("scroll", handleScroll);
window.addEventListener("load", () => {
  handleScroll();
  renderProjects();
});
