"use strict";

const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: false,

  // If we need pagination
  pagination: {
    el: ".swiper-news__pagination",
    clickable: true,
  },

  spaceBetween: 10,
  slidesPerView: 1,

  on: {
    slideChange: function () {
      const bullets = document.querySelectorAll(".swiper-pagination-bullet");
      const pagination = document.querySelector(".swiper-news__pagination");
      const container = document.querySelector('[class*="__container"]');
      let conx = container.getBoundingClientRect().left;

      let el1 = bullets[this.activeIndex];
      let el2 = bullets[this.previousIndex];

      let rect1 = el1.getBoundingClientRect();
      let rect2 = el2.getBoundingClientRect();

      let dx = rect1.left - rect2.left;

      let distance = Math.abs(dx);

      let animationLine = document.createElement("div");
      animationLine.className = "animation-line";
      if (this.activeIndex > this.previousIndex) {
        animationLine.style.width = `${distance + 7}px`;
        animationLine.style.left = `${rect2.left - conx - 20}px`;
        animationLine.classList.add("right");
      } else {
        animationLine.style.width = `${distance + 7}px`;
        animationLine.style.left = `${rect1.left - conx - 20}px`;
        animationLine.classList.add("left");
      }

      pagination.appendChild(animationLine);
      setTimeout(() => {
        animationLine.remove();
      }, 490);
    },
  },
});

resizeFooterButton();

function resizeFooterButton() {
  if (window.innerWidth <= 470) {
    document.getElementById("footer-button").style.transform =
      `scale(${window.innerWidth / 3.3}%)`;
  }
  window.addEventListener("resize", () => {
    if (window.innerWidth <= 470) {
      document.getElementById("footer-button").style.transform =
        `scale(${window.innerWidth / 3.5}%)`;
    }
  });
}
