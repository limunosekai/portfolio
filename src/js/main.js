/**
 * Page1--------------------------------------------------------------
 */

const bar = document.querySelector('.progressBar');
const cover = document.querySelector('.cover');
const rock1 = document.querySelector('.p1_img_rock1');
const rock2 = document.querySelector('.p1_img_rock2');
const leaf3 = document.querySelector('.p1_img_leaf3');
const leaf4 = document.querySelector('.p1_img_leaf4');
const leftLeaf = document.querySelector('.p1_img_left_leaf');
const rightLeaf = document.querySelector('.p1_img_right_leaf');
const loading = document.querySelector('.loading');

// 스크롤 top 좌표
let scrollTop = 0;
// 마우스 커서 좌표
let x = 0;
let y = 0;
// 마우스무브 좌표
let mx = 0;
let my = 0;
// 이미지 이동 속도
let speed = 0.0002;

// 로딩
const loadingStart = () => {
  loading.classList.add('active');
};

loadingStart();

// 초기화
window.onload = () => {
  cover.style.opacity = 0;
  loading.classList.remove('active');
};

// progress bar
const progressHandler = (e) => {
  scrollTop = document.documentElement.scrollTop;

  let per = Math.ceil(
    (scrollTop / (document.body.scrollHeight - window.innerHeight)) * 100
  );
  bar.style.height = per + '%';
};

// Page1 scroll evnet
const pageOneMovingHandler = (e) => {
  scrollTop = document.documentElement.scrollTop;

  cover.style.opacity = 0.1 + scrollTop / 850;
  rock1.style.transform = `translate(${-scrollTop / 3}px,0)`;
  rock2.style.transform = `translate(${scrollTop / 3}px,0)`;
};

// Page1 mousemove event
const moveHandler = (e) => {
  x = e.clientX - window.innerWidth / 2;
  y = e.clientY - window.innerHeight / 2;

  loop();
};

// Page1 loop animation
const loop = () => {
  mx += (x - mx) * speed;
  my += (y - my) * speed;

  leaf3.style.transform = `rotate(${-(mx / 20) - -(my / 20)}deg)`;
  leaf4.style.transform = `rotate(${-(mx / 50) - -(my / 50)}deg)`;
  leftLeaf.style.transform = `scale(${1 + mx / 13000 + my / 13000}) rotate(${
    -(mx / 100) - -(my / 100)
  }deg)`;
  rightLeaf.style.transform = `scale(${1 + mx / 10000 + my / 10000})`;
  window.requestAnimationFrame(loop);
};

window.addEventListener('mousemove', moveHandler, false);
window.addEventListener('scroll', progressHandler, false);
window.addEventListener('scroll', pageOneMovingHandler, false);

/**
 * Page2--------------------------------------------------------------
 */
const sectionTwo = document.querySelector('.page2');
const profiles = document.querySelectorAll('.slide_in');
// Page2 scroll event

function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// image slide
const checkSlide = (e) => {
  // image
  profiles.forEach((profile) => {
    // 스크롤바 절대 위치 - 요소 1/2 위치
    const slideInAt =
      window.scrollY + window.innerHeight - profile.offsetHeight / 2;
    // 이미지 상단 절대 위치
    const imageTop = window.scrollY + profile.getBoundingClientRect().top;
    // 이미지 하단 절대 위치
    const imageBottom = window.scrollY + profile.getBoundingClientRect().bottom;
    // slideInAt이 각 이미지의 상단보다 클때
    const isHalfShown = slideInAt > imageTop;
    // 현재 스크롤된 위치가 이미지 하단보다 작을때
    const isNotScrolledPast = window.scrollY < imageBottom;
    if (isHalfShown && isNotScrolledPast) {
      profile.classList.add('active');
    } else {
      profile.classList.remove('active');
    }
  });
};

window.addEventListener('scroll', debounce(checkSlide));

/**
 * Cloud-------------------------------------------------------------
 */

const cloud1 = document.querySelector('.cloud1');
const cloud2 = document.querySelector('.cloud2');
const frame = document.querySelector('.frame');

const cloudHandler = () => {
  scrollTop = document.documentElement.scrollTop;
  cloud1.style.transform = `translate(${scrollTop / 20}px,${scrollTop / 5}px)`;
  cloud2.style.transform = `translate(-${scrollTop / 20}px,${scrollTop / 5}px)`;
  frame.style.transform = `scale(${1 + scrollTop / 40000})`;
};

window.addEventListener('scroll', cloudHandler, false);

/**
 * Page3--------------------------------------------------------------
 */
const slideList = document.querySelector('.slide_list');
const slideContents = document.querySelectorAll('.slide_content');
const slideBtnNext = document.querySelector('.slide_btn_next');
const slideBtnPrev = document.querySelector('.slide_btn_prev');
const pagination = document.querySelector('.slide_pagination');
const slideLen = slideContents.length;
const slideWidth = 600; // 보여줄 슬라이드 너비
const slideSpeed = 400; // 슬라이딩 스피드
const startNum = 0; // 슬라이드 초기 인덱스

// 슬라이드 리스트 너비 2개를 붙일것이므로 + 2
slideList.style.width = slideWidth * (slideLen + 2) + 'px';

// 첫번째, 마지막 슬라이드 복사
let firstChild = slideList.firstElementChild;
let lastChild = slideList.lastElementChild;
let firstClone = firstChild.cloneNode(true);
let lastClone = lastChild.cloneNode(true);

// 복사한 슬라이드를 추가
slideList.appendChild(firstClone);
slideList.insertBefore(lastClone, slideList.firstElementChild);

// 슬라이드 너비 * 인덱스만큼 왼쪽으로 밀어서 슬라이드 효과
slideList.style.transform = `translate3d(-${
  slideWidth * (startNum + 1)
}px,0,0)`;

let curIndex = startNum;
let curSlide = slideContents[curIndex];
curSlide.classList.add('slide_active');

// 다음 버튼
const nextHandler = () => {
  if (curIndex <= slideLen - 1) {
    slideList.style.transition =
      slideSpeed + 'ms' + ' cubic-bezier(0.735, -0.015, 0.445, 1.035)';
    slideList.style.transform = `translate3d(-${
      slideWidth * (curIndex + 2)
    }px,0,0)`;
  }
  if (curIndex === slideLen - 1) {
    setTimeout(() => {
      slideList.style.transition = '0ms';
      slideList.style.transform = `translate3d(-${slideWidth}px,0,0)`;
    }, slideSpeed);
    curIndex = -1;
  }
  curSlide.classList.remove('slide_active');
  pageDots[curIndex === -1 ? slideLen - 1 : curIndex].classList.remove(
    'dot_active'
  );
  curSlide = slideContents[++curIndex];
  curSlide.classList.add('slide_active');
  pageDots[curIndex].classList.add('dot_active');
};

// 이전 버튼
const prevHandler = () => {
  if (curIndex >= 0) {
    slideList.style.transition =
      slideSpeed + 'ms' + ' cubic-bezier(0.735, -0.015, 0.445, 1.035)';
    slideList.style.transform = `translate3d(-${slideWidth * curIndex}px,0,0)`;
  }
  if (curIndex === 0) {
    setTimeout(function () {
      slideList.style.transition = '0ms';
      slideList.style.transform = `translate3d(-${
        slideWidth * slideLen
      }px,0,0)`;
    }, slideSpeed);
    curIndex = slideLen;
  }
  curSlide.classList.remove('slide_active');
  pageDots[curIndex === slideLen ? 0 : curIndex].classList.remove('dot_active');
  curSlide = slideContents[--curIndex];
  curSlide.classList.add('slide_active');
  pageDots[curIndex].classList.add('dot_active');
};

slideBtnPrev.addEventListener('click', prevHandler);
slideBtnNext.addEventListener('click', nextHandler);

// 패그니션 추가
let pageChild = '';
for (var i = 0; i < slideLen; i++) {
  pageChild += '<li class="dot';
  pageChild += i === startNum ? ' dot_active' : '';
  pageChild += '" data-index="' + i + '"><a href="#"></a></li>';
}
pagination.innerHTML = pageChild;

// 패그니션 무빙
const pageDots = document.querySelectorAll('.dot');

let curDot;
Array.prototype.forEach.call(pageDots, function (dot, i) {
  dot.addEventListener('click', function (e) {
    e.preventDefault();
    curDot = document.querySelector('.dot_active');
    curDot.classList.remove('dot_active');
    curDot = this;
    this.classList.add('dot_active');
    curSlide.classList.remove('slide_active');
    curIndex = Number(this.getAttribute('data-index'));
    curSlide = slideContents[curIndex];
    curSlide.classList.add('slide_active');
    slideList.style.transition = slideSpeed + 'ms';
    slideList.style.transform =
      'translate3d(-' + slideWidth * (curIndex + 1) + 'px, 0px, 0px)';
  });
});
