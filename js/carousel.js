"use strict";
/**
 * 슬라이드 아이템 리스트
 */
var slides = [
    { imgSrc: './img/item_01.webp', text: 'Item 01' },
    { imgSrc: './img/item_02.webp', text: 'Item 02' },
    { imgSrc: './img/item_03.webp', text: 'Item 03' },
    { imgSrc: './img/item_04.webp', text: 'Item 04' },
    { imgSrc: './img/item_05.webp', text: 'Item 05' }
];
/**
 * 슬라이드 컨테이너
 */
var slidesContainer = document.querySelector('.slides');
/**
 * 슬라이드 인디케이터
 */
var indicatorsContainer = document.querySelector('.indicators');
/**
 * 이전 슬라이드로 이동하는 버튼
 */
var prevButton = document.querySelector('.prev_btn');
/**
 * 다음 슬라이드로 이동하는 버튼
 */
var nextButton = document.querySelector('.next_btn');
/**
 * 자동 슬라이드 재생/멈춤을 토글하는 버튼
 */
var toggleAutoSlideButton = document.querySelector('.toogle_auto_slide_btn');
/**
 * 슬라이드 자동 재생 속도를 입력받는 인풋
 */
var speedInput = document.querySelector('#speedInput');
/**
 * 슬라이드 간격을 입력받는 인풋
 */
var gapInput = document.querySelector('#gapInput');
/**
 * 설정을 적용하는 버튼
 */
var applyButton = document.querySelector('.apply_btn');
/**
 * 현재 표시되고 있는 슬라이드 인덱스
 * (Default: 0)
 */
var currentIndex = 0;
/**
 * 자동 슬라이드 기능이 활성화 여부의 플래그
 * (Default: true - 자동 재생)
 */
var isAutoSliding = true;
/**
 * 자동 슬라이드의 전환 속도 (밀리초 단위)
 * (Default: 2000ms)
 */
var autoSlideSpeed = 2000;
/**
 * 슬라이드 간격을 설정하는 변수 (px 단위)
 * (Default: 20px)
 */
var slideGap = 20;
/**
 * 자동 슬라이드를 제어하는 interval ID
 * clearInterval 함수 호출 시 타이머를 중지하기 위함
 */
var autoSlideInterval;
/**
 * 터치 이벤트 발생 시 터치 시작 위치
 * 스와이프 동작을 감지하기 위함
 */
var touchStartX = 0;
/**
 * 슬라이드 아이템을 생성하는 기능
 * @param slide - 생성할 슬라이드 아이템 데이터
 * @returns 생성된 슬라이드 DOM
 */
function createSlide(slide) {
    var slideElement = document.createElement('div');
    slideElement.classList.add('slide');
    slideElement.innerHTML = "\n    <img src=\"".concat(slide.imgSrc, "\" alt=\"").concat(slide.text, "\">\n    <div class=\"slide-text\">").concat(slide.text, "</div>\n  ");
    return slideElement;
}
/**
 * 인디케이터를 생성하는 기능
 * @param index - 생성할 인디케이터 인덱스
 * @returns 생성된 인디케이터 DOM
 */
function createIndicator(index) {
    var indicator = document.createElement('div');
    indicator.classList.add('indicator');
    if (index === 0) {
        indicator.classList.add('active');
    }
    indicator.addEventListener('click', function () {
        stopAutoSlide();
        moveToSlide(index);
        startAutoSlide();
    });
    return indicator;
}
/**
 * 슬라이드 및 인디케이터 초기화
 * 모든 슬라이드 아이템과 인디케이터를 DOM에 추가하기 위함
 */
function initializeSlides() {
    slides.forEach(function (slide, index) {
        slidesContainer.appendChild(createSlide(slide));
        indicatorsContainer.appendChild(createIndicator(index));
    });
}
/**
 * 지정된 인덱스의 슬라이드로 이동
 * @param index - 이동할 슬라이드 인덱스
 */
function moveToSlide(index) {
    var slideElement = slidesContainer === null || slidesContainer === void 0 ? void 0 : slidesContainer.querySelector('.slide');
    var slideWidth = (slideElement === null || slideElement === void 0 ? void 0 : slideElement.offsetWidth) || 0;
    var isMoveToFirstSlide = index === 0 && currentIndex === slides.length - 1;
    var isMoveToLastSlide = index === slides.length - 1 && currentIndex === 0;
    slidesContainer.style.transition =
        isMoveToFirstSlide || isMoveToLastSlide ? 'none' : 'transform 0.5s ease';
    slidesContainer.style.transform = "translateX(-".concat(index * (slideWidth + slideGap), "px)");
    document.querySelectorAll('.indicator').forEach(function (indicator, i) {
        indicator.classList.toggle('active', i === index);
    });
    currentIndex = index;
    if (isMoveToFirstSlide || isMoveToLastSlide) {
        setTimeout(function () {
            slidesContainer.style.transition = '';
        }, 50);
    }
}
/**
 * 슬라이드 자동 재생
 * @param interval - 슬라이드 전환 간격 (default: autoSlideSpeed)
 */
function startAutoSlide(interval) {
    if (interval === void 0) { interval = autoSlideSpeed; }
    stopAutoSlide();
    autoSlideInterval = setInterval(function () {
        moveToSlide((currentIndex + 1) % slides.length);
    }, interval);
}
/**
 * 슬라이드 재생 중지
 */
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}
/**
 * 슬라이드를 이동
 * @param index - 이동할 슬라이드 인덱스
 */
function handleButtonClick(index) {
    stopAutoSlide();
    moveToSlide((currentIndex + index + slides.length) % slides.length);
    startAutoSlide();
}
/**
 * 슬라이드 전환 속도 검증
 */
function validateSpeed() {
    var speedValue = parseInt(speedInput.value);
    if (speedValue < 1000 || isNaN(speedValue)) {
        alert('속도는 1000ms 이상이어야 합니다. 1000ms로 입력됩니다.');
        speedInput.value = '1000';
    }
}
/**
 * 슬라이드 간격 검증
 */
function validateGap() {
    var gapValue = parseInt(gapInput.value);
    if (gapValue < 10 || isNaN(gapValue)) {
        alert('간격은 10px 이상이어야 합니다. 10px로 입력됩니다.');
        gapInput.value = '10';
    }
}
/**
 * 유저가 입력한 속도 및 간격 설정을 적용
 */
function applySettings() {
    var speedInputValue = parseInt(speedInput.value);
    var gapInputValue = parseInt(gapInput.value);
    if (!isNaN(speedInputValue) && speedInputValue >= 1000) {
        autoSlideSpeed = speedInputValue;
        speedInput.value = autoSlideSpeed.toString();
        startAutoSlide();
    }
    if (!isNaN(gapInputValue) && gapInputValue >= 10) {
        slideGap = gapInputValue;
        gapInput.value = slideGap.toString();
        document.querySelectorAll('.slide').forEach(function (slide) {
            slide.style.marginRight = "".concat(slideGap, "px");
        });
    }
}
/**
 * 자동 슬라이드를 재생/멈춤 토글 기능
 */
function toggleAutoSlide() {
    isAutoSliding = !isAutoSliding;
    toggleAutoSlideButton.innerHTML = isAutoSliding
        ? "<img src=\"./img/icon_pause.svg\" alt=\"auto sliding pause\">"
        : "<img src=\"./img/icon_play.svg\" alt=\"auto sliding play\">";
    isAutoSliding ? startAutoSlide() : stopAutoSlide();
}
/**
 * 슬라이드의 스와이프 동작 처리
 * @param event
 */
function handleSwipe(event) {
    var touchEndX = event.changedTouches[0].clientX;
    if (touchEndX < touchStartX - 50) {
        handleButtonClick(1);
    }
    else if (touchEndX > touchStartX + 50) {
        handleButtonClick(-1);
    }
}
speedInput.addEventListener('blur', validateSpeed);
gapInput.addEventListener('blur', validateGap);
applyButton.addEventListener('click', applySettings);
prevButton.addEventListener('click', function () { return handleButtonClick(-1); });
nextButton.addEventListener('click', function () { return handleButtonClick(1); });
toggleAutoSlideButton === null || toggleAutoSlideButton === void 0 ? void 0 : toggleAutoSlideButton.addEventListener('click', function () { return toggleAutoSlide(); });
slidesContainer.addEventListener('touchstart', function (event) {
    touchStartX = event.touches[0].clientX;
});
slidesContainer.addEventListener('touchend', function (event) { return handleSwipe(event); });
initializeSlides();
startAutoSlide();
//# sourceMappingURL=carousel.js.map