const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");
const viewButtons = document.querySelectorAll(".view-button");
const sectionButtons = document.querySelectorAll(".section-button");
const navigationButtons = document.querySelectorAll(".view-button, .section-button");
const pageViews = document.querySelectorAll(".page-view");
const resumeSections = document.querySelectorAll("#resume-view > section");

function closeNavigation() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  navigation.classList.remove("is-open");
}

function setActiveButton(activeButton) {
  navigationButtons.forEach((button) => {
    const isActive = button === activeButton;
    button.setAttribute("aria-pressed", String(isActive));
    button.classList.toggle("is-active", isActive);
  });
}

function replayEntrance(element) {
  element.classList.remove("is-entering");
  void element.offsetWidth;
  element.classList.add("is-entering");
}

function showFullResume() {
  pageViews.forEach((view) => {
    view.hidden = view.id !== "resume-view";
  });
  resumeSections.forEach((section) => {
    section.hidden = false;
  });
  setActiveButton(null);
  closeNavigation();
  window.scrollTo({ top: 0, behavior: "instant" });
  replayEntrance(document.getElementById("home"));
}

viewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const activeView = button.dataset.view;

    pageViews.forEach((view) => {
      view.hidden = view.id !== `${activeView}-view`;
    });
    replayEntrance(document.getElementById(`${activeView}-view`));
    setActiveButton(button);

    closeNavigation();
    window.scrollTo({ top: 0, behavior: "instant" });
  });
});

sectionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetSection = document.getElementById(button.dataset.section);
    pageViews.forEach((view) => {
      view.hidden = view.id !== "resume-view";
    });
    resumeSections.forEach((section) => {
      section.hidden = false;
    });
    replayEntrance(targetSection);
    setActiveButton(button);
    closeNavigation();
    targetSection.scrollIntoView({ behavior: "instant", block: "start" });
  });
});

document.querySelectorAll('a[href="#home"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    showFullResume();
  });
});

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
  navigation.classList.toggle("is-open", !isExpanded);
});

document.querySelector("#year").textContent = new Date().getFullYear();
