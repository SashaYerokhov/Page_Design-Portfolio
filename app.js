// Когда будете писать JavaScript, держите в голове одну важную подсказку для расчетов:Шаг сдвига (transform: translateX) для перехода к следующему слайду должен быть равен ширине одной картинки плюс отступу: 540px + 32px = 572px.

function updateImages() {
  const root = document.querySelector(".work__gallery");
  const images = root.querySelectorAll(".gallery__flex img");
//   console.log(images.length);
  
  const prev = root.querySelector(".prev__button");
  const next = root.querySelector(".next_button");

  const currentSlide = 0;

  prev.addEventListener('click', prevSlide);
  next.addEventListener('click', nextSlide);

  function prevSlide() {
    currentSlide = (currentSlide - 1 + images.length) % images.length;
  }
  function nextSlide() {
    currentSlide = (currentSlide + 1) % images.length;
  }
}

updateImages();

// Обработать слайдер из телеграмма
