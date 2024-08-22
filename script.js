const scroll = new LocomotiveScroll({
  el: document.querySelector('#main'),
  smooth: true
});

function mouseFollower() {
  window.addEventListener("mousemove", (dets) => {

    document.querySelector(".circle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`

  })
}
mouseFollower();




function firstPageAnim() {
  let tl = gsap.timeline();

  tl.from(".nav", {
    y: '-10',
    opacity: 0,
    duration: 1.4,
    ease: Expo
  }).to(".boundingelem1", {
    y: 0,
    ease: Expo,
    duration: 1,
    stagger: .2
  }).to(".boundingelem2", {
    y: '0',
    duration: 1.1,
    ease: Expo,
    stagger: .2
  })
}

firstPageAnim();


let timeout;


function circleSkew() {
  let xscale = 1;
  let yscale = 1;

  let xprev = 0;
  let yprev = 0;

  window.addEventListener("mousemove", (dets) => {
    clearTimeout(timeout)
    let xdiff = dets.clientX;
    let ydiff = dets.clientY;

    xprev = dets.clientX
    yprev = dets.clientY

    xscale = gsap.utils.clamp(.8, 1.2, xdiff);
    yscale = gsap.utils.clamp(.8, 1.2, ydiff);

    mouseFollower(xscale, yscale);

    timeout = setTimeout(() => {
      circle.style.transform = `scale(1,1)`
    }, 100)
  })
}


circleSkew();


document.querySelectorAll(".elem").forEach((elem) => {

  let rotate = 0;
  let diffrot = 0;

  elem.addEventListener("mousemove", (details) => {

    var diff = details.clientY - elem.getBoundingClientRect().top;
    diffrot = details.clientX - rotate;
    rotate = details.clientX;

    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power1,
      top: diff,
     left: details.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot),
    });
  });

  
  elem.addEventListener("mouseleave", (details) => {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power1,
      duration: .5,
    });
  });
});

