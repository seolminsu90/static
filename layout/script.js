// 페이지 이동
const hiddenPageButtons = document.querySelectorAll(".hidden-page-button");
const hiddenPages = document.querySelectorAll(".hidden-page");

hiddenPageButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        hiddenPages[index].toggleAttribute("hidden");
        hiddenPages[index].classList.toggle("active");
        if (hiddenPages[index].classList.contains("active")) {
            hiddenPages[index].scrollIntoView({ behavior: "smooth" });
            hiddenPages[index].focus();
        } else {
            button.focus();
        }
    });
});
const sliderContainers = Array.from(document.querySelectorAll(".slider-container"));

sliderContainers.forEach((container, index) => {
    const slider = container.querySelector(`.slider-${index + 1}`);
    const prevButton = container.querySelector(`.prev-button-${index + 1}`);
    const nextButton = container.querySelector(`.next-button-${index + 1}`);

    let currentIndex = 0;
    const slideWidth = slider.querySelector(".slide").offsetWidth;

    prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + slider.children.length) % slider.children.length;
        updateSliderPosition();
    });

    nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % slider.children.length;
        updateSliderPosition();
    });

    function updateSliderPosition() {
        const offset = -currentIndex * slideWidth;
        slider.style.transform = `translateX(${offset}px)`;
    }
});
