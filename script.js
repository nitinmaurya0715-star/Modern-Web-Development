const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

var timeout; 

function firstPageAnim() {
  var t1 = gsap.timeline();

  t1.from("#nav", {
    y: '-10',
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut
  })
    
    .to(".boundingelem", {
      y: 0,
      ease: Expo.easeInOut,
      duration: 2,
      delay: -1,
      stagger: .2,
    })
      
      .from("#herofooter", {
      y: '-10',
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut
      })
  
  
  
}

function circleChaptaKaro() {
  //define default scale value
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;
  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);
    xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(.8, 1.2, dets.clientY - yprev);
    
      xprev = dets.clientX;
      yprev = dets.clientY;
      
    circleMouseFollower(xscale, yscale);

    timeout =   setTimeout(function () {
      document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;

    }, 100)

  })
}


function circleMouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
  })
}

circleChaptaKaro();
circleMouseFollower();
firstPageAnim();


document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
            opacity: 0,
      duration: 0.5,
            ease: "Power20.out"
    });
  });



  elem.addEventListener("mousemove", function (dets) {
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-30,30, diffrot*5),
    });
  });
});


// const track = document.querySelector(".clients");

// if (track) {
//     gsap.to(track, {
//         x: "-50%",
//         duration: 15,
//         ease: "none",
//         repeat: -5,
//     });
// }


const track = document.querySelector(".clients");

if (track) {
    // Purani GSAP animation ko stop karo
    gsap.killTweensOf(track);

    // Logos ko duplicate sirf ek baar karo
    if (!track.dataset.cloned) {
        track.innerHTML += track.innerHTML;
        track.dataset.cloned = "true";
    }

    // Half width move karke seamless loop banao
    function animateClients() {
        const halfWidth = track.scrollWidth / 2;

        gsap.set(track, { x: 0 });

        gsap.to(track, {
            x: -halfWidth,
            duration: 10,
            ease: "none",
          repeat: -1,
            opacity: 2,
        });
    }

    animateClients();
}
