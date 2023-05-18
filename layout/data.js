// 데이터 설정
var careerData = [
    {
        src: "https://www.shutterstock.com/image-vector/short-custom-urls-url-shortener-600w-2233924609.jpg",
        title: "Company 2",
        level: "Level 2",
        start: "2022-05-30",
        end: getCurrentDateText(),
        work: "다른 주요 요약",
        tags: ["Tag 3", "Tag 4", "Tag 5"],
    },
    {
        src: "https://www.shutterstock.com/image-vector/short-custom-urls-url-shortener-600w-2233924609.jpg",
        title: "Company 2",
        level: "Level 2",
        start: "2020-03-09",
        end: "2022-05-27",
        work: "다른 주요 요약",
        tags: ["Tag 3", "Tag 4", "Tag 5"],
    },
    {
        src: "https://www.shutterstock.com/image-vector/short-custom-urls-url-shortener-600w-2233924609.jpg",
        title: "Company 2",
        level: "Level 2",
        start: "2018-10-29",
        end: "2020-02-28",
        work: "다른 주요 요약",
        tags: ["Tag 3", "Tag 4", "Tag 5"],
    },
    {
        src: "https://www.shutterstock.com/image-vector/short-custom-urls-url-shortener-600w-2233924609.jpg",
        title: "Company 2",
        level: "Level 2",
        start: "2014-09-30",
        end: "2018-10-25",
        work: "다른 주요 요약",
        tags: ["Tag 3", "Tag 4", "Tag 5"],
    },
    {
        src: "https://www.shutterstock.com/image-vector/short-custom-urls-url-shortener-600w-2233924609.jpg",
        title: "Company 1",
        level: "Level 1",
        start: "2013-11-18",
        end: "2014-09-19",
        work: "주요 요약",
        tags: ["Tag 1", "Tag 2"],
    },
];

var careerTextData = [
    {
        start: "2022-01-01",
        end: "2022-06-30",
        content: ["<strong>Content 1</strong>", "<em>Content 2</em>"],
    },
    {
        start: "2022-07-01",
        end: "2022-12-31",
        content: ['<span style="color: red;">Content 3</span>', '<span style="font-size: 18px;">Content 4</span>', "<br>", "<br>"],
    },
    {
        start: "2022-07-01",
        end: "2022-12-31",
        content: ["제5의나라 개발 구축", "바보와함께 이상한 작업 달성", "<br>", "<br>"],
    },
];

var portpolioData = [
    {
        src: [
            "https://www.shutterstock.com/image-vector/short-custom-urls-url-shortener-600w-2233924609.jpg",
            "https://www.shutterstock.com/image-vector/short-custom-urls-url-shortener-600w-2233924609.jpg",
            "https://www.shutterstock.com/image-vector/short-custom-urls-url-shortener-600w-2233924609.jpg",
        ],
        title: "Project 1",
        start: "2022-01-01",
        end: "2022-06-30",
        company: "Company 1",
        desc: "Project description 1",
        work: ["Work 1", "Work 2", "Work 3", "Work 4"],
        tag: ["Tag 1", "Tag 2"],
    },
    {
        src: [
            "https://www.shutterstock.com/image-vector/short-custom-urls-url-shortener-600w-2233924609.jpg",
            "https://www.shutterstock.com/image-vector/short-custom-urls-url-shortener-600w-2233924609.jpg",
            "https://www.shutterstock.com/image-vector/short-custom-urls-url-shortener-600w-2233924609.jpg",
        ],
        title: "Project 2",
        start: "2022-07-01",
        end: "2022-12-31",
        company: "Company 2",
        desc: "Project description 2",
        work: ["Work 5", "Work 6"],
        tag: ["Tag 3", "Tag 4", "Tag 5"],
    },
];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getCurrentDateText() {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

// 템플릿 생성 및 데이터 채워넣기 함수
function createTemplate(data, idx) {
    const template = document.createElement("div");
    template.className = "container";
    addXButton(template, () => {
        careerData.splice(idx, 1);
        const containers = document.getElementsByClassName("container");
        while (containers.length > 0) {
            containers[0].parentNode.removeChild(containers[0]);
        }

        const areas = document.getElementsByClassName("area");
        while (areas.length > 0) {
            areas[0].parentNode.removeChild(areas[0]);
        }

        renderData(careerData);
        createGraph();
    });

    const leftSpace = document.createElement("div");
    leftSpace.className = "left-space";

    const image = document.createElement("img");
    image.src = data.src;

    leftSpace.appendChild(image);
    template.appendChild(leftSpace);

    const rightSpaces = document.createElement("div");
    rightSpaces.className = "right-spaces";

    const rightSpace1 = document.createElement("div");
    rightSpace1.className = "right-space";

    const companyTitle = document.createElement("p");
    companyTitle.className = "company-title";
    companyTitle.textContent = data.title;

    const companyLevel = document.createElement("p");
    companyLevel.className = "company-level";
    companyLevel.textContent = data.level;

    const companyDate = document.createElement("p");
    companyDate.className = "company-date";
    companyDate.textContent = `${formatDate(data.start)} ~ ${formatDate(data.end)}`;

    rightSpace1.appendChild(companyTitle);
    rightSpace1.appendChild(companyLevel);
    rightSpace1.appendChild(companyDate);
    rightSpaces.appendChild(rightSpace1);

    const rightSpace2 = document.createElement("div");
    rightSpace2.className = "right-space";

    const companyWork = document.createElement("p");
    companyWork.className = "company-work";
    companyWork.textContent = data.work;

    const companyTag = document.createElement("p");
    companyTag.className = "company-tag";
    companyTag.textContent = data.tags.map((t) => "#" + t).join(" ");

    rightSpace2.appendChild(companyWork);
    rightSpace2.appendChild(companyTag);
    rightSpaces.appendChild(rightSpace2);

    template.appendChild(rightSpaces);

    return template;
}

// 데이터를 기반으로 템플릿 생성하여 화면에 추가하기
function renderData(data) {
    const contentElement = document.getElementsByClassName("section-career")[0];

    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const template = createTemplate(item, i);
        contentElement.appendChild(template);
    }
}

// 템플릿 생성 및 데이터 채워넣기 함수
function createCareerTemplate(data) {
    const template = document.createElement("div");
    template.className = "career-period";

    const date = document.createElement("p");
    date.className = "career-period-date";
    date.textContent = `📅 ${formatDate(data.start)} ~ ${formatDate(data.end)}`;

    const list = document.createElement("ul");
    list.className = "career-period-list";

    data.content.forEach((content) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = content;
        list.appendChild(listItem);
    });

    template.appendChild(date);
    template.appendChild(list);

    return template;
}

// 데이터를 기반으로 템플릿 생성하여 화면에 추가하기
function renderCareerData(data) {
    const contentElement = document.getElementsByClassName("career-periods")[0];

    data.forEach((item) => {
        const template = createCareerTemplate(item);
        contentElement.appendChild(template);
    });
}

// 템플릿 생성 및 데이터 채워넣기 함수
function createPortpolioTemplate(data, idx) {
    const template = document.createElement("div");
    template.className = "portpolio-wrap";

    addXButton(template, () => {
        portpolioData.splice(idx, 1);

        const ports = document.getElementsByClassName("portpolio-wrap");
        while (ports.length > 0) {
            ports[0].parentNode.removeChild(ports[0]);
        }

        renderPortpolioData(portpolioData);
    });

    const sliderContainer = document.createElement("div");
    sliderContainer.className = "slider-container";
    sliderContainer.classList.add(`slider-container-${data.index}`);

    const slider = document.createElement("div");
    slider.className = "slider";
    slider.classList.add(`slider-${data.index}`);

    data.src.forEach((src) => {
        const slide = document.createElement("div");
        slide.className = "slide";

        const image = document.createElement("img");
        image.src = src;
        image.alt = "Slide";

        slide.appendChild(image);
        slider.appendChild(slide);
    });

    const prevButton = document.createElement("div");
    prevButton.className = "prev-button";
    prevButton.classList.add(`prev-button-${data.index}`);
    prevButton.textContent = "‹";

    const nextButton = document.createElement("div");
    nextButton.className = "next-button";
    nextButton.classList.add(`next-button-${data.index}`);
    nextButton.textContent = "›";

    sliderContainer.appendChild(slider);
    sliderContainer.appendChild(prevButton);
    sliderContainer.appendChild(nextButton);

    const projectInfo = document.createElement("div");
    projectInfo.className = "w50 pl10";

    const titleWrap = document.createElement("div");
    titleWrap.className = "project-title-wrap";

    const projectTitle = document.createElement("p");
    projectTitle.className = "project-title";
    projectTitle.textContent = data.title;

    const projectDate = document.createElement("p");
    projectDate.className = "project-date";
    projectDate.textContent = `${formatDate(data.start)} ~ ${formatDate(data.end)}`;

    const projectName = document.createElement("p");
    projectName.className = "project-name";
    projectName.textContent = data.company;

    titleWrap.appendChild(projectTitle);
    titleWrap.appendChild(projectDate);
    titleWrap.appendChild(projectName);

    const projectDesc = document.createElement("div");
    projectDesc.className = "project-desc";
    projectDesc.innerHTML = data.desc;

    const workList = document.createElement("ul");

    data.work.forEach((work) => {
        const listItem = document.createElement("li");
        listItem.textContent = `- ${work}`;
        workList.appendChild(listItem);
    });

    const projectTag = document.createElement("p");
    projectTag.className = "project-tag";
    projectTag.textContent = `#${data.tag.join(" #")}`;

    projectInfo.appendChild(titleWrap);
    projectInfo.appendChild(projectDesc);
    projectInfo.appendChild(workList);
    projectInfo.appendChild(projectTag);

    template.appendChild(sliderContainer);
    template.appendChild(projectInfo);

    return template;
}

// 데이터를 기반으로 템플릿 생성하여 화면에 추가하기
function renderPortpolioData(data) {
    const contentElement = document.getElementsByClassName("portpolio-top-wrap")[0];

    data.forEach((item, index) => {
        item.index = index + 1; // 인덱스 값 설정
        const template = createPortpolioTemplate(item, index);
        contentElement.appendChild(template);
    });
}

function formatDate(dateString) {
    if (dateString.length === 7) {
        const year = dateString.substring(0, 4);
        const month = dateString.substring(5, 7);
        return `${year}년 ${month}월`;
    }

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}년 ${month}월 ${day}일`;
}

function createGraph() {
    const graphElement = document.getElementById("graph");
    graphElement.innerHTML = "";

    const lineStart = new Date("2010-01-01");
    const lineEnd = new Date("2025-12-31");

    const lineLength = lineEnd.getTime() - lineStart.getTime();

    // 가중치를 적용할 최대 높이 설정
    const maxWeightedHeight = 200;

    // 기간이 긴 영역에 가중치를 적용하여 높이 계산
    const weightedData = careerData.map((item) => {
        const startDate = new Date(item.start);
        const endDate = new Date(item.end);

        const duration = endDate.getTime() - startDate.getTime();
        const weight = Math.ceil((duration / lineLength) * maxWeightedHeight);

        return { ...item, weight };
    });

    // 가중치를 기준으로 오름차순 정렬
    weightedData.sort((a, b) => a.weight - b.weight);

    let currentHeight = maxWeightedHeight;

    for (const item of weightedData) {
        const areaElement = document.createElement("div");
        areaElement.classList.add("area");

        const areaElementNameTag = document.createElement("p");
        areaElementNameTag.textContent = item.title;

        areaElement.appendChild(areaElementNameTag);

        const startDate = new Date(item.start);
        const endDate = new Date(item.end);

        const startPercentage = ((startDate.getTime() - lineStart.getTime()) / lineLength) * 100;
        const endPercentage = ((endDate.getTime() - lineStart.getTime()) / lineLength) * 100;

        const areaWidth = endPercentage - startPercentage;
        const areaHeight = Math.min(item.weight, currentHeight); // 현재 높이와 비교하여 최대 높이 제한

        areaElement.style.bottom = "0"; // 맨 아래에서 시작하도록 설정
        areaElement.style.left = `${startPercentage}%`;
        areaElement.style.width = `${areaWidth}%`;
        areaElement.style.height = `${areaHeight}px`; // 가중치에 따른 높이 설정

        graphElement.appendChild(areaElement);

        currentHeight -= areaHeight;
    }
}

// 그래프 생성 함수 호출
createGraph();

renderData(careerData);
renderCareerData(careerTextData);
renderPortpolioData(portpolioData);

function addXButton(element, func) {
    const xButton = document.createElement("div");
    xButton.classList.add("x-button");

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "2");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");

    const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line1.setAttribute("x1", "18");
    line1.setAttribute("y1", "6");
    line1.setAttribute("x2", "6");
    line1.setAttribute("y2", "18");

    const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line2.setAttribute("x1", "6");
    line2.setAttribute("y1", "6");
    line2.setAttribute("x2", "18");
    line2.setAttribute("y2", "18");

    svg.appendChild(line1);
    svg.appendChild(line2);

    xButton.appendChild(svg);
    xButton.addEventListener("click", func);
    element.appendChild(xButton);
}
