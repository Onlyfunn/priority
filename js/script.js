"use strict";
if (typeof Swiper !== "undefined") {
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
}

resizeFooterButton();

function resizeFooterButton() {
  if (window.innerWidth <= 470) {
    document.getElementById("footer-button").style.transform =
      `scale(${window.innerWidth / 3.3}%)`;
  } else {
    document.getElementById("footer-button").style.transform = `scale(140%)`;
  }
  window.addEventListener("resize", () => {
    if (window.innerWidth <= 470) {
      document.getElementById("footer-button").style.transform =
        `scale(${window.innerWidth / 3.5}%)`;
    }
  });
}

/*-------------------------------------------------------------------------------------------
-------------------------------------MODELS---------------------------------------------
-------------------------------------------------------------------------------------------*/

let markSelected = false;
showModels();

function clickOutModels() {
  const modelsSearchHeaders = document.querySelectorAll(
    ".models-search__header",
  );
  modelsSearchHeaders.forEach((element, index) => {
    element.nextElementSibling.classList.remove("_show");
    let modelsSearchHeaderValues = [];
    const modelsChoices = element.nextElementSibling.querySelectorAll(
      ".models-search__choice input",
    );
    markSelected = false;
    let count = 0;
    modelsChoices.forEach((element) => {
      if (element.checked) {
        modelsSearchHeaderValues.push(element.parentElement.textContent.trim());

        count += 1;
      }
    });
    if (modelsSearchHeaderValues.join(", ").length >= 26) {
      element.value = modelsSearchHeaderValues.join(", ").slice(0, 26) + "...";
    } else {
      element.value = modelsSearchHeaderValues.join(", ");
    }
    if (count > 0) {
      markSelected = true;
      if (index === 0) {
        modelsSearchHeaders[1].parentElement.classList.remove("_block");
        modelsSearchHeaders[1].placeholder = "Model1, Model2, Model3, Mo...";
      }
    } else {
      if (index === 0) {
        modelsSearchHeaders[1].parentElement.classList.add("_block");
        modelsSearchHeaders[1].placeholder = "В начале выберите марку";
      }
    }
  });
}
function showModels() {
  const modelsSearchHeaders = document.querySelectorAll(
    ".models-search__header",
  );

  if (!modelsSearchHeaders) return;

  modelsSearchHeaders.forEach((element) => {
    element.addEventListener("focus", function (e) {
      modelsSearchHeaders.forEach((element) => {
        element.nextElementSibling.classList.remove("_show");
      });
      element.nextElementSibling.classList.add("_show");
    });
    element.addEventListener("blur", function (e) {});
  });
}

/*-------------------------------------------------------------------------------------------
------------------------------------DATE---------------------------------------------
-------------------------------------------------------------------------------------------*/

function showDate(e) {
  const dateSearchHeaders = document.querySelectorAll(".date-search__header");
  dateSearchHeaders.forEach((element) => {
    if (element != e.target.closest(".date-search__header")) {
      element.nextElementSibling.classList.remove("_show");
    }
  });
  e.target
    .closest(".date-search__header")
    .nextElementSibling.classList.toggle("_show");
}

function clickOutDate() {
  const dateSearchHeaders = document.querySelectorAll(".date-search__header");
  dateSearchHeaders.forEach((element) => {
    element.nextElementSibling.classList.remove("_show");
  });
}

function clickOnDate(e) {
  e.target.closest(
    ".date-search__choice",
  ).parentElement.previousElementSibling.innerHTML = `${e.target
    .closest(".date-search__choice")
    .textContent.trim()} 
    <svg class="date-search__arrow" width="9px" height="6px">
      <use href="./img/sprite.svg#arrow3"></use>
     </svg>`;
}

/*-------------------------------------------------------------------------------------------
-------------------------------------POLITIC--------------------------------------------
-------------------------------------------------------------------------------------------*/

function showPolitic(e) {
  const politicBodies = document.querySelectorAll(".politic__body");

  if (
    e.target
      .closest(".politic__header")
      .parentElement.classList.contains("_show")
  ) {
    e.target.closest(".politic__header").nextElementSibling.style.maxHeight =
      `${0}px`;
  } else {
    politicBodies.forEach((element) => {
      element.parentElement.classList.remove("_show");
      element.style.maxHeight = `${0}px`;
    });
    e.target.closest(".politic__header").nextElementSibling.style.maxHeight =
      `${e.target.closest(".politic__header").nextElementSibling.scrollHeight + 10}px`;
  }
  e.target.closest(".politic__header").parentElement.classList.toggle("_show");
}

document.addEventListener("click", function (e) {
  if (!e.target.closest(".models-search__model")) {
    clickOutModels();
  }
  if (e.target.closest(".date-search__header")) {
    showDate(e);
  }
  if (!e.target.closest(".date-search__header")) {
    clickOutDate();
  }
  if (e.target.closest(".date-search__choice")) {
    clickOnDate(e);
  }
  if (e.target.closest(".selected-search__cross")) {
    e.target.closest(".selected-search__cross").parentElement.remove();
  }
  if (e.target.closest(".politic__header")) {
    showPolitic(e);
  }
  if (!e.target.closest(".politic__header")) {
    const politicBodies = document.querySelectorAll(".politic__body");
    politicBodies.forEach((element) => {
      element.parentElement.classList.remove("_show");
      element.style.maxHeight = `${0}px`;
    });
  }
});

if (typeof IMask !== "undefined") {
  IMask(document.getElementById("phone"), {
    mask: "+{7} (000) 000-00-00",
  });
}
