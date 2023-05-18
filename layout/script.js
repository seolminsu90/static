// 문서가 완전히 로드된 후 실행될 함수
(() => {
    const mode = getUrlParameter("mode");
    let career = document.getElementById("ms-career");
    let portpolio = document.getElementById("ms-portpolio");
    let careerText = document.getElementById("ms-career-text");

    if (mode === "") {
        console.log("mo Mode");
        career.style.display = "block";
        portpolio.style.display = "block";
        careerText.style.display = "block";
    } else {
        const modeSplit = mode.split(",");

        for (let idx in modeSplit) {
            switch (modeSplit[idx]) {
                case "career": {
                    career.style.display = "block";
                    break;
                }
                case "portpolio": {
                    portpolio.style.display = "block";
                    break;
                }
                case "careerText": {
                    careerText.style.display = "block";
                    break;
                }
            }
        }
    }

    if (career && getComputedStyle(career).display === "none") career.remove();
    if (portpolio && getComputedStyle(portpolio).display === "none") portpolio.remove();
    if (careerText && getComputedStyle(careerText).display === "none") careerText.remove();

    var lineElements = document.getElementsByClassName("line");

    for (var i = 0; i < lineElements.length; i++) {
        var currentElement = lineElements[i];
        var nextElement = currentElement.nextElementSibling;

        if (!nextElement || !nextElement.classList.contains("page")) {
            currentElement.style.display = "none";
        }
    }
})();

function onDocumentReady() {
    init();
}

// DOMContentLoaded 이벤트 리스너 등록
document.addEventListener("DOMContentLoaded", onDocumentReady);

function init() {
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
    const xButtons = document.querySelectorAll(".parent-x-button");
    xButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const parent = button.parentElement;
            if (parent) {
                parent.style.display = "none";
            }
        });
    });

    const hiddenCommand = document.querySelector(".hidden-command");
    hiddenCommand.addEventListener("click", handleClick);
}

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

    const nexts = document.getElementsByClassName("next-button");
    while (nexts.length > 0) {
        nexts[0].parentNode.removeChild(nexts[0]);
    }

    const prevs = document.getElementsByClassName("prev-button");
    while (prevs.length > 0) {
        prevs[0].parentNode.removeChild(prevs[0]);
    }
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
