console.log('jesteś na szalonych maszynach');

//ANIMATE SVG-INTRO

let tlSnailEye = gsap.timeline({repeat: -1});
tlSnailEye.to(".robo-worm .eye", 0.3, {x:-2, y: 3, ease: Power0.easeNone})
.to(".robo-worm .eye", 0.5, {x:2, ease: Power0.easeNone})
.to(".robo-worm .eye", 0.5, {x: 1, y: -3, ease: Power0.easeNone})
.to(".robo-worm .eye", 0.3, {x:0, y: 0, ease: Power0.easeNone});

//should be able to put in one timeline
let tlGhostsBlink1 = gsap.timeline({repeat: -1, yoyo: true});
tlGhostsBlink1.addLabel('start')
.to(".ghosts .eye-1, .eye-4", 0.2, {scaleY:0.2, transformOrigin:"50% 50%", delay: 2})
.from('.ghosts .eye-3', 0.3, {scaleY: 0, transformOrigin:"50% 50%"}, 'start')


let tlGhostsBlink2 = gsap.timeline({repeat: -1, yoyo: true});
tlGhostsBlink2.addLabel('start')
.to(".ghosts .eye-2, .eye-6", 0.2, {scaleY:0.2, transformOrigin:"50% 50%", delay: 1})
.from('.ghosts .eye-5', 0.1, {scaleY: 0, transformOrigin:"50% 50%"}, 'start')

let tlMaster = gsap.timeline();

tlMaster.addLabel('start')
.add(tlGhostsBlink1)
.add(tlGhostsBlink2, 'start')
.to(".petals path", 2, {fill : "#f7ebb1"}, 'start')
.from(".small-flower", 2, {scale: 0, transformOrigin:"50% 50%"})
.from(".snake-leaf-filling .fruit", 1, {scale: 0.2, transformOrigin: '50% 50%', stagger: 0.5})
.from(".robo-worm", 10, {x:300}, 'start')
.add(tlSnailEye)
.to(".trybik-upper", 3, {rotation:360, transformOrigin:"50% 50%", repeat: -1, ease: Power0.easeNone}, '<') 
.from(".tulip-stem", 12, {scaleY: 0.3},'start');

    //SCROLL-TRIGGERED 

    let tlOnScroll = gsap.timeline({ scrollTrigger: {
        trigger: 'h1',
        start: 'top top',
        //markers: true
    }});

    tlOnScroll.addLabel('start')
    .to(".trybik-middle", 0.5, {rotation: 15, transformOrigin:"50% 50%", repeat: -1, yoyo: true, ease: Power0.easeNone})
    .to(".trybik-lower", 5, {rotation: -360, transformOrigin:"50% 50%", repeat: -1}, 'start')
    .from(".octopus", 10, {x:-50, y:80}, 'start')
    .set('.cactuses .left, .cactuses .middle, .cactuses .right', {scaleY:0, y:-10}, 'start')
    .set('.cactusy-lil-ball, .lil-ball-filling', { y:-10}, 'start')
    .set('.cactus-flowers', { y: -10}, 'start')
    .fromTo(".huge-stems .cactus-stem, .huge-stems .cactus-stem-contour", 8, {x: 500, y:0}, {x: 0, y:-10}, 'start')
    .from('.leaves .one, .leaves .two, .leaves .four, .leaves .five', 2, {scale: 0, transformOrigin: "right"}, '-=2')
    .to(".cactuses .left, .cactuses .middle, .cactuses .right", 4, { transformOrigin: "top", scaleY: 1, })
    .from('.cactus-flowers .right-flower, .cactus-flowers .left-flower', 1, {scale: 0, transformOrigin: "50% 50%", stagger: 0.5});


    //ANIMATIONS ON HOVER

    let tlB = gsap.timeline();
    let tlA = gsap.timeline();
    let tlW = gsap.timeline();
    let tlF = gsap.timeline();
    let tlC = gsap.timeline();
    let tlO = gsap.timeline();

    const ball = document.querySelector('.ball-filling .ball');
    const alien = document.querySelector('.static-alien-filling');
    const wheel = document.querySelector('.wheel');
    const flower = document.querySelector('.flower .middle');
    const cactuses = document.querySelector('.cactuses');
    const octopus = document.querySelector('.octopus');

        ball.addEventListener('mouseenter', ()=>{
            tlB.restart();
            tlB.to('.ball-eyes path', 0.2, {fill: "#e6c8c5", stagger: 0.3, pointerEvents: "none", repeat: -1} )
        });
        ball.addEventListener('mouseleave', ()=>{
            tlB.reverse();
        });
    
    
        
        alien.addEventListener('mouseenter', ()=>{
            tlA.restart();
            tlA.to('.static-alien-filling .eye', 0.3, {scale: 1.5, transformOrigin: "20% 50%", ease: Power0.easeNone});
        });
        alien.addEventListener('mouseleave', ()=>{
            tlA.reverse();
        });


        wheel.addEventListener('mouseenter', ()=>{
            tlW.invalidate();
            tlW.restart();
            tlW.to('.wheel', 3, {rotate: "+=360", transformOrigin: "50% 50%", ease: Power0.easeNone});
        });
        wheel.addEventListener('mouseleave', ()=>{
            tlW.pause();
        });

        flower.addEventListener('mouseenter', ()=>{
            tlF.restart();
            tlF.to('.flower .petals path', 1, {fill: "#CB6E95"});
        });
        flower.addEventListener('mouseleave', ()=>{
            tlF.reverse();
        });
        
        cactuses.addEventListener('mouseenter', ()=>{
            tlC.restart();
            tlC.to('.leaves .moveable', 4, {scaleY: 0.3, y: 200, pointerEvents: "none"});
        });
        cactuses.addEventListener('mouseleave', ()=>{
            tlC.restart();
            tlC.pause();
        });
        octopus.addEventListener('mouseenter', ()=>{
            tlO.restart();
            tlO.to('.octopus ', 1, {fill: "#E5C9AF", opacity: 0});
        });
        octopus.addEventListener('mouseleave', ()=>{
            tlO.reverse();
        });