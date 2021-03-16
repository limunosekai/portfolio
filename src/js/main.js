let scrollTop = 0;
let bar = document.querySelector('.progressBar');

const progressHandler = (e) => {
  scrollTop = document.documentElement.scrollTop;

  let per = Math.ceil(
    (scrollTop / (document.body.scrollHeight - window.innerHeight)) * 100
  );
  bar.style.height = per + '%';
};

window.addEventListener('scroll', progressHandler, false);
