{
    'use strict';

    const select = {
        home: {
            title: '.oval-background h1',
        },
        welcome: {
            section: '.welcome',
            caption: '.welcome .welcome-caption',
            mamRocketContainer: '.mamrotek-rakieta-container',
            mamRocketImg: '.mamrotek-rakieta',
        },
        worlds: {
            section: '.worlds',
            title: '.worlds h3',
            buttons: '.worlds-container .button',
        },
        sisters: {
            kopulyImg: '.kopuly-img',
            sistersImg: '.sisters-img',
        },

    };

    const app = {

        initData: function (){
            console.log('tu beda dane');

            //media queries 
            const mediaQuery = window.matchMedia('(max-width: 768px)');
            if (mediaQuery.matches) {
                document.querySelector(select.sisters.sistersImg).src = './images/sisters-mobile.png';
                document.querySelector(select.sisters.kopulyImg).src = './images/kopuly-mobile.png';
              }
        },

        animate: function () {

            const typeingTitle = document.querySelector(select.home.title);
            const caption = document.querySelector(select.welcome.caption);
            const welcomeSection = document.querySelector(select.welcome.section);
            const mamRocket = document.querySelector(select.welcome.mamRocketContainer);
            const mamRocketImg = document.querySelector(select.welcome.mamRocketImg);
            const kopulyImg = document.querySelector(select.sisters.kopulyImg);
            const sistersImg = document.querySelector(select.sisters.sistersImg);
            const worldsTitle = document.querySelector(select.worlds.title);
            const worldsSection = document.querySelector(select.worlds.section);
            const worldsBtns = document.querySelectorAll(select.worlds.buttons);
            let sistersDistance = sistersImg.offsetHeight;

            // ANIMATIE TYPEING EFFECT 
            let index = 0;
            const text = "Maya's Worlds"; // /n is for slicing midline, not working in this case

            function typeing() {
                typeingTitle.innerText= "";

                let letter = text.slice(0, ++index);
                typeingTitle.textContent = letter;

                let timer = setTimeout(typeing, 500);
                if (timer > 50) {
                    clearTimeout(timer);
                }
            };

            typeing();

            // ANIMATE MAMROCKET
            let animation = gsap.timeline({
                delay: 3, repeat: -1, repeatDelay: 2, scrollTrigger: {
                    trigger: welcomeSection,
                    start: 'top 35%',
                }
            });

            animation.to(mamRocket, { x: window.innerWidth + mamRocket.offsetWidth, duration: 10, ease: Linear.easeNone })
                .to(mamRocketImg, { y: 15, duration: 0.3, repeat: 14, yoyo: true }, 0)
                .to(mamRocket, { rotate: -35, duration: 2 }, 4.5)
                .to(mamRocket, { y: -welcomeSection.offsetHeight, duration: 4.5 }, 5.5)
                .to(mamRocket, { scale: 0.3, duration: 3.5 }, 6.5);


            // ANIMATE SCROLLTRIGGERED APEARING OTHER ELEMENTS
            gsap.fromTo(caption, { y: '+=100', opacity: '0' }, {
                y: '0', opacity: '1', duration: 1, ease: 'easeInOut', scrollTrigger: {
                    trigger: welcomeSection,
                    start: 'top 35%'
                }
            });

            
            gsap.fromTo(worldsTitle, { y: '+=100', opacity: '0' }, {
                y: '0', opacity: '1', duration: 1, ease: 'easeInOut', scrollTrigger: {
                    trigger: worldsSection,
                    start: 'top 50%'
                }
            });
            gsap.fromTo(worldsBtns, { opacity: 0 }, {
                opacity: 1, stagger: 1, duration: 1, ease: 'easeInOut', scrollTrigger: {
                    trigger: worldsSection,
                    start: 'top 45%'
                }
            });
            let distance = -0.04 * sistersDistance;
            gsap.to(kopulyImg, {y: distance, duration: 1, scrollTrigger: {
                    trigger: kopulyImg,
                    start: 'top 35%',
                    end: 'bottom 70%',
                    scrub: 1
                }
            });
        },

        init: function () {
            this.initData();
            this.animate();
        
            
        },
    };


    app.init();

}

// TO DO's

// -czemu po scrolowaniu ponizej home animacja typeingu sie zatrzymuje bez progresu ?


