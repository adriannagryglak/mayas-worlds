{
    'use strict';         
    
    //globalny obiekt z elementami do użycia potem
    const elements = {};

    const app = {

        initData(){

            this.data = dataSource.mayasWorlds;

            for (let el in this.data.elements){
                //tworze zmienna na podstawie danych z obiektu, ktora bedzie elementem do global elements
                let newEl = document.querySelector(`${this.data.elements[el][0]}`);
                //nie kazda ma innerhtml potrzebny- mowi mi o tym typ 2 argumentu tablicy
                if(typeof this.data.elements[el][1] === 'string'){
                    newEl.innerHTML = `${this.data.elements[el][1]}`;
                }
                //nie kazdy element potrzebujemy w global elements , wiec sprawdzamy oznaczenie jedynką
                if(this.data.elements[el].includes(1)){   
                    elements[el] = newEl; 
                }
            }

            console.log(elements);
            
            //generuj buttony dynamicznie 
            for (let button in this.data.buttons){
                let content = button;
                button = this.data.buttons[button];

                let div = document.createElement('div');
                div.classList.add('button');
                elements.worldsContainer.append(div);

                let a = document.createElement('a');
                a.classList.add('world-link');
                a.setAttribute('href', button.href);
                div.append(a);
                
                let span = document.createElement('span');
                span.textContent = content;
                a.append(span);

                let img = document.createElement('img');
                img.classList.add('sneak-img');
                img.setAttribute('src', button.src);
                img.setAttribute('alt', button.alt);
                div.append(img);
            }
        
            //media queries for loading proper image in sisters-section
            const mediaQuery = window.matchMedia('(max-width: 768px)');
            if (mediaQuery.matches) {
                elements.sistersImg.src = './images/sisters-mobile.png';
                elements.kopulyImg.src = './images/kopuly-mobile.png';
              }
        },

        animate() {

            // ANIMATIE TYPEING EFFECT 
            let index = 0;
            const titleText = elements.title.innerHTML; 

            function typeing() {
                let letter = titleText.slice(0, ++index);
                elements.title.textContent = letter;

                let timer = setTimeout(typeing, 500);
                if (timer > 50) {
                    clearTimeout(timer);
                }
            };
            window.setTimeout(typeing, 500);

            // ANIMATE MAMROCKET
            let animation = gsap.timeline({
                delay: 3, repeat: -1, repeatDelay: 2, scrollTrigger: {
                    trigger: elements.welcomeSection,
                    start: 'top 35%',
                }
            });

            animation.to(elements.mamRocket, { x: window.innerWidth + elements.mamRocket.offsetWidth, duration: 10, ease: Linear.easeNone })
                .to(elements.mamRocketImg, { y: 15, duration: 0.3, repeat: 14, yoyo: true }, 0)
                .to(elements.mamRocket, { rotate: -35, duration: 2 }, 4.5)
                .to(elements.mamRocket, { y: -elements.welcomeSection.offsetHeight, duration: 4.5 }, 5.5)
                .to(elements.mamRocket, { scale: 0.3, duration: 3.5 }, 6.5);


            // ANIMATE SCROLLTRIGGERED APEARING OTHER ELEMENTS
            gsap.fromTo(elements.welcomeCaption, { y: '+=100', opacity: '0' }, {
                y: '0', opacity: '1', duration: 1, ease: 'easeInOut', scrollTrigger: {
                    trigger: elements.welcomeSection,
                    start: 'top 35%'
                }
            });
            
            gsap.fromTo(elements.worldsCaption, { y: '+=100', opacity: '0' }, {
                y: '0', opacity: '1', duration: 1, ease: 'easeInOut', scrollTrigger: {
                    trigger: elements.worldsSection,
                    start: 'top 50%'
                }
            });

            let sistersDistance = elements.sistersImg.offsetHeight;
            let distance = -0.04 * sistersDistance;
            
            gsap.to(elements.kopulyImg, {y: distance, duration: 1, scrollTrigger: {
                    trigger: elements.kopulyImg,
                    start: 'top 35%',
                    end: 'bottom 70%',
                    scrub: 1
                }
            });
        },

        init() {
            this.initData();
            this.animate();
        },
    };

    app.init();
}