// A slider with circular scrolling and index calculation by modulo (%)

function updateImages() {
  const root = document.querySelector(".work__gallery");
  // Protection if the element is not on the page
  if (!root) return;

  const images = root.querySelectorAll(".gallery__flex img");

  // We create an array of paths to images to take them from there.
  const imageUrls = Array.from(images).map((img) => img.src);
  const totalCount = imageUrls.length;

  // We find 3 visible slots in the markup
  const leftSlot = root.querySelector(".gallery__flex img:nth-child(1)");
  const centerSlot = root.querySelector(".gallery__flex img:nth-child(2)");
  const rightSlot = root.querySelector(".gallery__flex img:nth-child(3)");

  const prev = root.querySelector(".prev__button");
  const next = root.querySelector(".next_button");

  // The cycle is on
  let loopEnabled = true;
  // Index of the central (fully visible) slide
  let currentCenterIndex = 1;

  function updateDisplay(centerIndex) {
    // variables for cropped slides on the sides
    let leftIndex, rightIndex;

    // Boundary processing (with looping)
    if (loopEnabled) {
      leftIndex = (centerIndex - 1 + totalCount) % totalCount;
      rightIndex = (centerIndex + 1) % totalCount;

      // Correctly changing images using the .src property
      leftSlot.src = imageUrls[leftIndex];
      centerSlot.src = imageUrls[centerIndex];
      rightSlot.src = imageUrls[rightIndex];

      // Update the state of the buttons (if without looping)
      prev.disabled = false;
      next.disabled = false;
    } else {
      leftIndex = centerIndex - 1;
      rightIndex = centerIndex + 1;

      // Logic for disabled loop (hiding side slots)
      if (leftIndex < 0) {
        leftSlot.style.visibility = "hidden";
      } else {
        leftSlot.style.visibility = "visible";
        leftSlot.src = imageUrls[leftIndex];
      }

      if (rightIndex >= totalCount) {
        rightSlot.style.visibility = "hidden";
      } else {
        rightSlot.style.visibility = "visible";
        rightSlot.src = imageUrls[rightIndex];
      }

      centerSlot.src = imageUrls[centerIndex];

      // Lock buttons
      prev.disabled = centerIndex === 0;
      next.disabled = centerIndex === totalCount - 1;
    }
  }

  // Forward button handler
  function nextSlide() {
    if (loopEnabled) {
      currentCenterIndex = (currentCenterIndex + 1) % totalCount;
    } else {
      if (currentCenterIndex < totalCount - 1) {
        currentCenterIndex++;
      }
    }
    updateDisplay(currentCenterIndex);
  }

  // Back button handler
  function prevSlide() {
    if (loopEnabled) {
      currentCenterIndex = (currentCenterIndex - 1 + totalCount) % totalCount;
    } else {
      if (currentCenterIndex > 0) {
        currentCenterIndex--;
      }
    }
    updateDisplay(currentCenterIndex);
  }
  // INITIALIZATION
  function init() {
    updateDisplay(currentCenterIndex);

    prev.addEventListener("click", prevSlide);
    next.addEventListener("click", nextSlide);
  }

  init();
}

updateImages();
