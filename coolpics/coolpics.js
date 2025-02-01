// Select the menu button and the menu items
const menuButton = document.querySelector(".menu");
const menuItems = document.querySelector(".menu-items");

// Function to toggle the menu
function toggleMenu() {
    console.log("Button clicked!"); // This will show in the console when clicked
    menuItems.classList.toggle("hide");
  }

// Listen for clicks on the menu button
menuButton.addEventListener("click", toggleMenu);

function handleResize() {
    const menu = document.querySelector(".menu-items");
    if (window.innerWidth > 1000) {
      menu.classList.remove("hide");
    } else {
      menu.classList.add("hide");
    }
  }

  handleResize();

  window.addEventListener("resize", handleResize);


  function viewerTemplate(pic, alt) {
    return `<div class="viewer">
      <button class="close-viewer">X</button>
      <img src="${pic}" alt="${alt}">
      </div>`;
  }

  function viewHandler(event) {
    const clickedImage = event.target;
  
    // Get the src attribute and split it to get the base file name
    const imagePath = clickedImage.src.split("-")[0] + "-full.jpeg";
    const altText = clickedImage.alt;
  
    // Insert the modal with the large image at the top of the body
    const modalHtml = viewerTemplate(imagePath, altText);
    document.body.insertAdjacentHTML("afterbegin", modalHtml);
  
    // Add a listener to the close button
    const closeButton = document.querySelector(".close-viewer");
    closeButton.addEventListener("click", closeViewer);
  }

  function closeViewer() {
    const viewer = document.querySelector(".viewer");
    viewer.remove();
  }

  const gallery = document.querySelector(".gallery");
gallery.addEventListener("click", viewHandler);
