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

// 초기화
window.onload = () => {
  cover.style.opacity = 0;
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
  rock1.style.transform = `translate(${-scrollTop / 5}px,0)`;
  rock2.style.transform = `translate(${scrollTop / 5}px,0)`;
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
  leftLeaf.style.transform = `scale(${1 + mx / 14000 + my / 14000})`;
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
const profile = document.querySelector('.p2_img_profile');
const text = document.querySelector('.p2_profile_text');

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
  const slideInAt = window.scrollY + window.innerHeight - profile.height / 4;
  const imageBottom = profile.offsetTop + profile.height;
  const isHalfShown = slideInAt > profile.offsetTop;
  const isNotScrolledPast = window.scrollY < imageBottom;
  if (isHalfShown && isNotScrolledPast) {
    profile.classList.add('active');
    text.classList.add('active');
  } else {
    profile.classList.remove('active');
    text.classList.remove('active');
  }
};

window.addEventListener('scroll', debounce(checkSlide), false);
