
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
        },

    };

    const app = {
        init: function () {
            const thisApp = this;
            console.log('*** App starting ***');
            console.log('thisApp:', thisApp);
            thisApp.animate();
        },

        animate: function () {

            const typeingTitle = document.querySelector(select.home.title);
            const caption = document.querySelector(select.welcome.caption);
            const welcomeSection = document.querySelector(select.welcome.section);
            const mamRocket = document.querySelector(select.welcome.mamRocketContainer);
            const mamRocketImg = document.querySelector(select.welcome.mamRocketImg);
            const kopulyImg = document.querySelector(select.sisters.kopulyImg);
            const worldsTitle = document.querySelector(select.worlds.title);
            const worldsSection = document.querySelector(select.worlds.section);
            const worldsBtns = document.querySelectorAll(select.worlds.buttons);

            // ANIMATIE TYPEING EFFECT 
            let index = 0;
            const text = "Maya's Worlds";

            function typeing() {

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
            gsap.to(kopulyImg, {
                y: -35, duration: 1, scrollTrigger: {
                    trigger: kopulyImg,
                    start: 'top 35%',
                    end: 'bottom 70%',
                    scrub: 1
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
        },






    };


    app.init();

}

// TO DO's
// -odjezdza rakieta zle w mobile
// -odsuwanie img kopuł podczas scrolowania po sekcji sisters jest zależne od pikseli, przez co mobile się rozjeżdza
// -rozmiar czcionki w sekcji sisters w mobile jest za duży
// -czemu po scrolowaniu ponizej home animacja typeingu sie zatrzymuje bez progresu ?


