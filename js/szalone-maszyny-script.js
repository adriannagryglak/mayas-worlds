
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
    .set(".small-flower, .snake-leaf-filling .fruit, .robo-worm, .tulip-stem, .octopus, .cactus-stem", {visibility: "visible"})
    .add(tlGhostsBlink1)
    .add(tlGhostsBlink2, 'start')
    .to(".petals path", 2, {fill : "#f7ebb1"}, 'start')
    .from(".small-flower", 2, {scale: 0, transformOrigin:"50% 50%"})
    .from(".snake-leaf-filling .fruit", 1, {scale: 0.2, transformOrigin: '50% 50%', stagger: 0.5})
    .from(".robo-worm", 10, {x:300}, 'start')
    .add(tlSnailEye)
    .to(".trybik-upper", 3, {rotation:360, transformOrigin:"50% 50%", repeat: -1, ease: Power0.easeNone}, '<') 
    .from(".tulip-stem", 12, {scaleY: 0.3},'start');

    //SCROLL-TRIGGERED INTRO

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


    //ANIMATIONS ON HOVER intro

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
    const virus = document.querySelector('#virus');

        ball.addEventListener('mouseenter', ()=>{
            tlB.restart();
            tlB.to('.ball-eyes path', 0.1, {fill: "#e6c8c5", stagger: 0.1, pointerEvents: "none", repeat: -1} )
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
            tlO.restart()
            .to('.octopus path', 0.5, {fill: "#E5C9AF"})
            .to('.octopus', 1, {opacity: 0});
        });
        octopus.addEventListener('mouseleave', ()=>{
            tlO.reverse();
        });




        //show tips on hover 
        const showTips = document.querySelector('.show-tips .filling');
        showTips.addEventListener('mouseover', ()=>{
            gsap.to(showTips, 0.1, {pointerEvents: "all", cursor: "pointer"});
        });
        showTips.addEventListener('mousedown', ()=>{
            gsap.to('.covit, .bakteria-sign, .silnik', 0.1, {opacity: 1});
        });
        showTips.addEventListener('mouseup', ()=>{
            gsap.to('.covit, .bakteria-sign, .silnik', 0.5, {opacity: 0});
        });

        //game-background animations
        tlBroom = gsap.timeline({repeat: -1, yoyo:true});
        tlBroom.fromTo('.broom', 1, {rotate: "10deg", transformOrigin: "top", ease: Power0.linear}, {rotate: "-10deg", transformOrigin: "top", ease: Power0.linear});


        tlBacteria = gsap.timeline({repeat: -1, repeatDelay: 2});
        tlBacteria.from('#bacteria', 1, {scale: 0, transformOrigin: "50% 50%"})
                    .to('#bacteria', 1.5, {x: "+=1100", ease: Power1.easeInOut })
                    .to('#bacteria', 1.5, { y: "-=500", ease: Power1.easeInOut })
                    .to ('#bacteria', 0.5, {opacity: 0}, "-=0.5")
                    .to('.brain-filling', 0.1, {x:"+=20", yoyo:true, repeat:5});


        //LETS GO GAMING after scroll 
        let tlStartGame = gsap.timeline({ scrollTrigger: {
            trigger: '.game',
            start: 'top 30%',
            toggleClass: {targets: "#smoke1, #smoke2", className: "smoke-animate"}
        }});

        tlStartGame.set(virus, { x: 600, y: 2780, visibility: "visible", scale: 0})
            .add(tlBroom)
            .add(tlBacteria, "<")
            .fromTo(virus, 1, {scale: 0, transformOrigin: "50% 50%"}, {scale: 1, transformOrigin: "50% 50%", onComplite: letsPlay});


    function letsPlay(){
        
        Draggable.create(virus, {

            onDrag: function(){   
               
                //start line -time counting (why this works)
                if(this.hitTest('#start-line')){
                     t1 = performance.now();
                     return t1
                }

                //loop over boundries- gameover detectors and finish line behavior
                const rects = document.querySelectorAll('.boundries rect');
                let i = rects.length;
                
                while (--i > -1) {
                    if(this.hitTest(rects[i])){
                        this.kill(); 
                        gsap.to('#virus path', 0.3, {fill: "#D86D66"});
                        gameOver();
                    }
                }
                
                if(this.hitTest('.brain-filling')){
                    t2 = performance.now();
                    gamerTime = (t2-t1)/1000;
                    gsap.to(this.target, 0.2, {scale: 0, transformOrigin: "50% 50%"});
                    this.kill();
                    tlBacteria.kill();
                    tlFinish = gsap.timeline();
                    tlFinish.to('.brain-filling', 0.5, {scale: 1.5, transformOrigin: "50% 50%"})
                    .to('.brain-filling path', 0.3, {fill: '#CB6E95'}, "-=0.2")
                    .to('.brain-filling path', 0.3, {fill: '#f7ebb1'})
                    .to('.brain-filling path', 0.3, {fill: '#88AC94'})
                    .to('.brain-filling path', 0.3, {fill: '#836090'})
                    .to('.brain-filling path', 0.3, {fill: '#CB6E95'})
                    .to('.brain-filling path', 0.3, {fill: '#f7ebb1'})
                    .to('.brain-filling path', 0.3, {fill: '#88AC94'})
                    .to('.brain-filling path', 0.3, {fill: '#86C5D2'})
                    .to('.brain-filling', 0.5, {scale: 1, transformOrigin: "50% 50%", onComplete: winnerIs, onCompleteParams: [gamerTime]}, "-=0.2");
                    
                } 
            

                //detectors for direction-checking
                if(this.hitTest('#direction-ok')){
                    gsap.set('.direction-detector', {y: 0})  
                }

                //fancy flashes dissapearing on hover
                const flash = document.querySelectorAll('.pioruny .not-engine path');
                let j = flash.length;
                while (--j > -1) {
                    if(this.hitTest(flash[j])){
                          gsap.to(flash[j], 0.5, {opacity: 0});
                    }
                }

                //smoke detectors and animations
                const detectors = document.querySelectorAll('.smoke-detectors rect');
                const smokes = document.querySelectorAll('.dymki path')
                let d = detectors.length;
                while (--d > -1) {
                    if(this.hitTest(detectors[d])){  
                        smokes[d+2].classList.add('smoke-animate');  
                    }
                }
                
                //loosing viruses arms
                if(this.hitTest('.lampy')){
                    gsap.to('.lampy', 2, {opacity: 1});
                    gsap.to(this.target, 2, {rotate: 360, transformOrigin: "50% 50%"}, "<");
                    gsap.to( '#virus .arm', 0.5, {scale : 0, transformOrigin:"bottom", stagger: 0.2});
                    gsap.to('#virus #middle', 0.3, {scale: 1.5, transformOrigin: "50% 50%"}, "+=0.2");
                }else{
                        gsap.to('.lampy', 2, {opacity: 0});
                }
            }
        })
    };
  
    const gameOverBackground = document.querySelector('.game-over-background');

    function gameOver(){
        
        gameOver = function(){}; // kill it as soon as it was called
        
        gameOverBackground.classList.add('game-over');

        gameOverBackground.addEventListener("animationend", function() {
            
            let tlShake = gsap.timeline({repeat: 18, yoyo: true}).fromTo('.svg-bezjaj', 0.3, {rotate:-2, transformOrigin: "50% 50%"}, {rotate:2,transformOrigin: "50% 50%", ease: Power0.easeNone});
            
            let height = window.innerHeight;
            let heightBubbles = document.querySelector('.svg-upper-bubbles-bezjaj').clientHeight;
            let tlBezjaj = gsap.timeline({onComplete: showButton, onCompleteParams: ["game over.", "lost"]});

            tlBezjaj.set('.svg-upper-bubbles-bezjaj', { x: "25vw", height: "100vh"})
                .to('.svg-upper-bubbles-bezjaj g', 0.7, {y: height - heightBubbles, visibility: "visible", stagger: 0.2,  ease: Bounce.easeOut})
                .set('.svg-bezjaj', {scale: 1, height: "100vh", })
                .add(tlShake, "-=1")
                .fromTo('.svg-bezjaj', 6, { x: "130vw" }, {x: "40vw", ease: Power0.easeOut}, "<")
                .to('.svg-bezjaj .eyes .left, .svg-bezjaj .eyes .right', 1, {x: -5}, "-=1")
                .to('.svg-bezjaj .eyes .left, .svg-bezjaj .eyes .right', 1, {delay: 0.5, x: 5} )
                .to('.svg-bezjaj .eyes .left, .svg-bezjaj .eyes .right', 1, {delay: 0.5, x: 0} )
                .to('.svg-bezjaj .eyes .left, .svg-bezjaj .eyes .right', 1, {scaleY: 0.3, transformOrigin: "50% 50%"})
                .to('.svg-bezjaj .eyes .left, .svg-bezjaj .eyes .right', 1, { delay: 0.5, scale: 2, transformOrigin: "50% 50%"})
                .to('.svg-bezjaj', 4, { scale: 65, ease: Power1.easeIn, transformOrigin: "36% 48.5%" })
                .to(gameOverBackground, 1, {background: "#000000"}, "-=1.5" )
                .set('.svg-upper-bubbles-bezjaj', {opacity: 0}, "-=3");
        
        
            });
    
    }

    function winnerIs(score){
        
        let tlZjaj = gsap.timeline();
        gameOverBackground.style.zIndex= "10";
    
        tlZjaj.to('.blur', 0.5, {filter:"blur(3px)"})
            .set('.svg-zjaj', {scale: 1 , height: "100vh", x: "-40vw"})
            .to('.zjaj', 0.3, {y: "-1%", repeat: -1, yoyo: true})
            .to('.svg-zjaj', 6, {x: "30vw", ease: Power1.easeOut})
            .set('.dymki-zjaj', {visibility: "visible", scale: 0, transformOrigin: "50% 50%"})
            .addLabel('start-arm')
            .from('.svg-zjaj .bubbles .right-one g', 0.5, {delay: 0.7, x: -800, y: 300, opacity: 0, stagger: 0.5, ease: Elastic.easeOut.config(1, 0.3)})
            .from('.svg-zjaj .bubbles .right-two g', 0.5, {x: -600, y: 100, opacity: 0, stagger: 0.5, ease: Elastic.easeOut.config(1, 0.3)})
            .from('.svg-zjaj .bubbles .left g', 0.5, {x: 600, y: 100, opacity: 0, stagger: 0.5, ease: Elastic.easeOut.config(1, 0.3)}, "start-arm")
            .to('.dymki-zjaj', 1, {scale: 1, stagger: 1, transformOrigin: "50% 50%"})
            .to('.svg-zjaj', 4 ,{x: "100vw", ease: Power1.easeIn, onComplete: showButton, onCompleteParams: [gamerTime]})
            .to('.dymki-zjaj', 1, {scale: 0, transformOrigin: "50% 50%"}, "-=1.5");
    }


    function showButton(caption, lost){

        const p = document.createElement('p');
        p.classList.add('game-over-caption');
        

        if(lost){
            gsap.to('.svg-bubu ', {scale:2.5, x: "-50%", y: "-50%"});
            gsap.to('.svg-bubu g', 1, {opacity: 0.7, stagger: 0.7});
            p.innerText = caption; 
        }else{
            gsap.to('.svg-game', 1, {opacity: 0});
            p.innerText = "Gratulacje, unieszkodliwiłeś toksycznie szaloną materię w " + Math.round((caption + Number.EPSILON) * 100) / 100 + "sek. Tylko Zjaj zrobiłby to lepiej!"; 
            p.style.color= '#000000';
        }

        const btn = document.createElement('div');
        btn.classList.add('button');
        btn.classList.add('button-game-over');

        const a = document.createElement('a');
        a.classList.add('world-link');

        const span = document.createElement('span');
        span.innerText= "chcesz jeszcze raz?"

        gameOverBackground.appendChild(p);
        gameOverBackground.appendChild(btn);
        btn.appendChild(a);
        a.appendChild(span);
        
        btn.addEventListener('click', function(){
            location.reload();
        });
       
    }


