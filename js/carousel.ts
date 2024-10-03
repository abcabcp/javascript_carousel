/**
 * 슬라이드 아이템 데이터 구조
 * @property imgSrc - 슬라이드 이미지 소스 URL
 * @property text - 슬라이드 내 표시될 텍스트
 */
type SlideItem = {
  imgSrc: string;
  text: string;
};

/**
 * 슬라이드 아이템 리스트
 */
const slides: SlideItem[] = [
  { imgSrc: './img/item_01.webp', text: 'Item 01' },
  { imgSrc: './img/item_02.webp', text: 'Item 02' },
  { imgSrc: './img/item_03.webp', text: 'Item 03' },
  { imgSrc: './img/item_04.webp', text: 'Item 04' },
  { imgSrc: './img/item_05.webp', text: 'Item 05' }
];

/**
 * 슬라이드 컨테이너
 */
const slidesContainer = document.querySelector('.slides') as HTMLElement;

/**
 * 슬라이드 인디케이터
 */
const indicatorsContainer = document.querySelector('.indicators') as HTMLElement;

/**
 * 이전 슬라이드로 이동하는 버튼
 */
const prevButton = document.querySelector('.prev_btn') as HTMLButtonElement;

/**
 * 다음 슬라이드로 이동하는 버튼
 */
const nextButton = document.querySelector('.next_btn') as HTMLButtonElement;

/**
 * 자동 슬라이드 재생/멈춤을 토글하는 버튼
 */
const toggleAutoSlideButton = document.querySelector('.toogle_auto_slide_btn') as HTMLButtonElement;

/**
 * 슬라이드 자동 재생 속도를 입력받는 인풋
 */
const speedInput = document.querySelector('#speedInput') as HTMLInputElement;

/**
 * 슬라이드 간격을 입력받는 인풋
 */
const gapInput = document.querySelector('#gapInput') as HTMLInputElement;

/**
 * 설정을 적용하는 버튼
 */
const applyButton = document.querySelector('.apply_btn') as HTMLButtonElement;

/**
 * 현재 표시되고 있는 슬라이드 인덱스
 * (Default: 0)
 */
let currentIndex = 0;

/**
 * 자동 슬라이드 기능이 활성화 여부의 플래그
 * (Default: true - 자동 재생)
 */
let isAutoSliding = true;

/**
 * 자동 슬라이드의 전환 속도 (밀리초 단위)
 * (Default: 2000ms)
 */
let autoSlideSpeed = 2000;

/**
 * 슬라이드 간격을 설정하는 변수 (px 단위)
 * (Default: 20px)
 */
let slideGap = 20;

/**
 * 자동 슬라이드를 제어하는 interval ID
 * clearInterval 함수 호출 시 타이머를 중지하기 위함
 */
let autoSlideInterval: NodeJS.Timeout;

/**
 * 터치 이벤트 발생 시 터치 시작 위치
 * 스와이프 동작을 감지하기 위함
 */
let touchStartX = 0;

/**
 * 슬라이드 아이템을 생성하는 기능
 * @param slide - 생성할 슬라이드 아이템 데이터
 * @returns 생성된 슬라이드 DOM
 */
function createSlide(slide: SlideItem): HTMLDivElement {
  const slideElement = document.createElement('div');
  slideElement.classList.add('slide');
  slideElement.innerHTML = `
    <img src="${slide.imgSrc}" alt="${slide.text}">
    <div class="slide-text">${slide.text}</div>
  `;
  return slideElement;
}

/**
 * 인디케이터를 생성하는 기능
 * @param index - 생성할 인디케이터 인덱스
 * @returns 생성된 인디케이터 DOM
 */
function createIndicator(index: number): HTMLElement {
  const indicator = document.createElement('div');
  indicator.classList.add('indicator');

  if (index === 0) {
    indicator.classList.add('active');
  }

  indicator.addEventListener('click', () => {
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
function initializeSlides(): void {
  slides.forEach((slide, index) => {
    slidesContainer.appendChild(createSlide(slide));
    indicatorsContainer.appendChild(createIndicator(index));
  });
}

/**
 * 지정된 인덱스의 슬라이드로 이동
 * @param index - 이동할 슬라이드 인덱스
 */
function moveToSlide(index: number): void {
  const slideElement = slidesContainer?.querySelector('.slide') as HTMLElement;
  const slideWidth = slideElement?.offsetWidth || 0;

  const isMoveToFirstSlide = index === 0 && currentIndex === slides.length - 1;
  const isMoveToLastSlide = index === slides.length - 1 && currentIndex === 0;

  slidesContainer.style.transition =
    isMoveToFirstSlide || isMoveToLastSlide ? 'none' : 'transform 0.5s ease';

  slidesContainer.style.transform = `translateX(-${index * (slideWidth + slideGap)}px)`;

  document.querySelectorAll('.indicator').forEach((indicator, i) => {
    indicator.classList.toggle('active', i === index);
  });

  currentIndex = index;

  if (isMoveToFirstSlide || isMoveToLastSlide) {
    setTimeout(() => {
      slidesContainer.style.transition = '';
    }, 50);
  }
}

/**
 * 슬라이드 자동 재생
 * @param interval - 슬라이드 전환 간격 (default: autoSlideSpeed)
 */
function startAutoSlide(interval: number = autoSlideSpeed): void {
  stopAutoSlide();
  autoSlideInterval = setInterval(() => {
    moveToSlide((currentIndex + 1) % slides.length);
  }, interval);
}

/**
 * 슬라이드 재생 중지
 */
function stopAutoSlide(): void {
  clearInterval(autoSlideInterval);
}

/**
 * 슬라이드를 이동
 * @param index - 이동할 슬라이드 인덱스
 */
function handleButtonClick(index: number): void {
  stopAutoSlide();
  moveToSlide((currentIndex + index + slides.length) % slides.length);
  startAutoSlide();
}

/**
 * 슬라이드 전환 속도 검증
 */
function validateSpeed(): void {
  const speedValue = parseInt(speedInput.value);
  if (speedValue < 1000 || isNaN(speedValue)) {
    alert('속도는 1000ms 이상이어야 합니다. 1000ms로 입력됩니다.');
    speedInput.value = '1000';
  }
}

/**
 * 슬라이드 간격 검증
 */
function validateGap(): void {
  const gapValue = parseInt(gapInput.value);
  if (gapValue < 10 || isNaN(gapValue)) {
    alert('간격은 10px 이상이어야 합니다. 10px로 입력됩니다.');
    gapInput.value = '10';
  }
}

/**
 * 유저가 입력한 속도 및 간격 설정을 적용
 */
function applySettings(): void {
  const speedInputValue = parseInt(speedInput.value);
  const gapInputValue = parseInt(gapInput.value);

  if (!isNaN(speedInputValue) && speedInputValue >= 1000) {
    autoSlideSpeed = speedInputValue;
    speedInput.value = autoSlideSpeed.toString();
    startAutoSlide();
  }

  if (!isNaN(gapInputValue) && gapInputValue >= 10) {
    slideGap = gapInputValue;
    gapInput.value = slideGap.toString();
    document.querySelectorAll('.slide').forEach((slide) => {
      (slide as HTMLElement).style.marginRight = `${slideGap}px`;
    });
  }
}

/**
 * 자동 슬라이드를 재생/멈춤 토글 기능
 */
function toggleAutoSlide(): void {
  isAutoSliding = !isAutoSliding;
  toggleAutoSlideButton.innerHTML = isAutoSliding
    ? `<img src="./img/icon_pause.svg" alt="auto sliding pause">`
    : `<img src="./img/icon_play.svg" alt="auto sliding play">`;
  isAutoSliding ? startAutoSlide() : stopAutoSlide();
}

/**
 * 슬라이드의 스와이프 동작 처리
 * @param event
 */
function handleSwipe(event: TouchEvent): void {
  const touchEndX = event.changedTouches[0].clientX;
  if (touchEndX < touchStartX - 50) {
    handleButtonClick(1);
  } else if (touchEndX > touchStartX + 50) {
    handleButtonClick(-1);
  }
}

speedInput.addEventListener('blur', validateSpeed);
gapInput.addEventListener('blur', validateGap);
applyButton.addEventListener('click', applySettings);

prevButton.addEventListener('click', () => handleButtonClick(-1));
nextButton.addEventListener('click', () => handleButtonClick(1));
toggleAutoSlideButton?.addEventListener('click', () => toggleAutoSlide());

slidesContainer.addEventListener('touchstart', (event) => {
  touchStartX = event.touches[0].clientX;
});

slidesContainer.addEventListener('touchend', (event) => handleSwipe(event));

initializeSlides();
startAutoSlide();
