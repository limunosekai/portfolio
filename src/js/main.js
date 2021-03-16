const bar = document.querySelector('.progressBar');
const cover = document.querySelector('.cover');
const rock1 = document.querySelector('.img_rock1');
const rock2 = document.querySelector('.img_rock2');
const leaf3 = document.querySelector('.img_leaf3');
const leaf4 = document.querySelector('.img_leaf4');
const leftLeaf = document.querySelector('.img_left_leaf');
const rightLeaf = document.querySelector('.img_right_leaf');

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

window.onload = () => {
  cover.style.opacity = 0;
};

const progressHandler = (e) => {
  scrollTop = document.documentElement.scrollTop;

  let per = Math.ceil(
    (scrollTop / (document.body.scrollHeight - window.innerHeight)) * 100
  );
  bar.style.height = per + '%';
  cover.style.opacity = 0.1 + scrollTop / 850;
  rock1.style.transform = `translate(${-scrollTop / 10}px,0)`;
  rock2.style.transform = `translate(${scrollTop / 10}px,0)`;
};

const moveHandler = (e) => {
  x = e.clientX - window.innerWidth / 2;
  y = e.clientY - window.innerHeight / 2;

  loop();
};

const loop = () => {
  mx += (x - mx) * speed;
  my += (y - my) * speed;

  leaf3.style.transform = `rotate(${-(mx / 30) - -(my / 30)}deg)`;
  leaf4.style.transform = `rotate(${-(mx / 50) - -(my / 50)}deg)`;
  leftLeaf.style.transform = `scale(${1 + mx / 14000 + my / 14000})`;
  rightLeaf.style.transform = `scale(${1 + mx / 14000 + my / 14000})`;
  window.requestAnimationFrame(loop);
};

window.addEventListener('mousemove', moveHandler, false);
window.addEventListener('scroll', progressHandler, false);
