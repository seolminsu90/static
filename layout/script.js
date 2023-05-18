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

// 슬라이더
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

// 버튼 숨김 처리
const xButtons = document.querySelectorAll(".x-button");
xButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const parent = button.parentElement;
        if (parent) {
            parent.style.display = "none";
        }

        /*const target = button.previousElementSibling;
        if (target) {
            target.style.display = "none";
        }
        button.style.display = "none";*/
    });
});

// 변경 모드 관련
let clickCount = 0;
function handleClick() {
    clickCount++;

    if (clickCount == 3) {
        contentControlMode();
    } else if (clickCount === 4) {
        printImageMode();
    } else if (clickCount === 5) {
        exitControlMode();
    }

    if (clickCount >= 5) {
        clickCount = 0;
    }

    const managementMode = document.querySelector(".management-mode");
    managementMode.style.display = clickCount === 3 || clickCount === 4 ? "block" : "none";
}

function contentControlMode() {
    console.log("Remove item Mode.");
    document.querySelectorAll(".x-button").forEach((btn) => (btn.style.display = "block"));
}

function exitControlMode() {
    console.log("Bye.");
    document.querySelectorAll(".x-button").forEach((btn) => (btn.style.display = "none"));
}

function printImageMode() {
    console.log("Image slide X Mode.");
}

const hiddenCommand = document.querySelector(".hidden-command");
hiddenCommand.addEventListener("click", handleClick);
