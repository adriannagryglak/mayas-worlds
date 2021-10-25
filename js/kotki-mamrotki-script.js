/* global Handlebars*/
{
    'use strict'

    class Question {
        constructor(data) { //this- to pojedyncza instancja tej klasy w domysle 'thisQuestion' pojedyncze pytanie 
            //bez przypisania dane sa niewykrozystane 
            this.data = data;

            this.rendertoTest();
            this.checkIfCorrect();
        }

        rendertoTest() {
            const template = document.getElementById("question-template").innerHTML; //pobierz szablon
            const fillTemplateWith = Handlebars.compile(template); //użyj go w funkci stworzonej
            let newHtml = fillTemplateWith(this.data); //użyj funckji z danymi

            //tworzymy element dom -object html, z naszego html jako wlasciwosc instacji- by miec pozniej do tego dostep ! przy uzyciu pozyczonej funkcji
            this.element = this.createDOMFromHTML(newHtml);
            //wstawiamy na strone nasz element
            const testContainer = document.querySelector('#test');
            testContainer.appendChild(this.element);
        }

        createDOMFromHTML(htmlString) {
            let div = document.createElement('div');
            div.innerHTML = htmlString.trim();
            return div.firstChild;
        }

        checkIfCorrect() {
            let pointsForQuestion
            let trueAnswear

            //which answear is true- store it in variable
            for (let option in this.data.options) {
                if (this.data.options[option].length == 2) {
                    trueAnswear = option;
                }
            }

            //which is chosen, check if element is clicked, clear all others answears 
            let options = this.element.querySelectorAll('.question li'); 
            for (let option of options) {
                option.addEventListener('click', function () {
                    pointsForQuestion = 0;
                    for (let option of options) { //loop in the same loop, is it okay?
                        option.classList.remove('choosed');
                    }

                    option.classList.add('choosed');
                    let chosenAnswear = this.querySelector('span').innerText;
                    //are they the same? -count points
                    if (chosenAnswear === trueAnswear) {
                        pointsForQuestion = 1; 
                    }
                });
            }

            const submitTestBtn = document.querySelector('.mamrotki-test .button');
            submitTestBtn.addEventListener('click', function (event) {
                event.preventDefault();
                app.data.points.push(pointsForQuestion);
            });
        }
    }

    const app = {
        initData() {
            this.data = dataSource.kotkiMamrotki;
            this.data.points = []; 
            this.data.maxPoints = 0;
        },

        initTest() {

            for (let question in this.data.questions) {
                new Question(this.data.questions[question]); //dla kazdego pytania tworzy instancje przekazując dane 'nazwe' i to co po niej w data.js
                this.data.maxPoints ++;
            }
            //animate test
            const img = document.querySelector('.img-hint');
            const caption = document.querySelector('.p-hint');

            let distance = -0.9 * img.clientWidth ;
            let distanceCap = -0.4 * caption.clientHeight ;
            let widthCap = -1.5 * caption.clientWidth ;

            gsap.set(img, { y:distance});
            gsap.set(caption, {y: distanceCap});
            gsap.fromTo(img, { x: widthCap }, {
                x: '-5%', ease: 'easeInOut', duration: 2, scrollTrigger: {
                    trigger: img,
                    start: 'top 45%',
                }
            });
            gsap.fromTo(caption, { x: widthCap }, {
                x: '-5%', ease: 'easeInOut', duration: 2, scrollTrigger: {
                    trigger: img,
                    start: 'top 45%'
                }
            });
        },

        getName() {
            const confirmUserBtn = document.querySelector('.confirm-user');
            const userInput = document.querySelector('.create-user input');
            const anonimBtn = document.querySelector('.anonymous');
            const welcomeUsrName = document.querySelector('.welcome-caption .family-name');
            const welcomeUsrCaption = document.querySelector('.welcome-caption .family-cap');
            const data = this.data.family;

            function hideIntroduction (){
                const userDiv = document.querySelector('.create-user');
                userDiv.style.top = "-100%";
                document.querySelector('body').style.overflowY = "auto";
            }

            confirmUserBtn.addEventListener('click', function () {
                //walidacja wypelnionego pola
                if(!userInput.value){
                    window.alert('podaj imię w prosotkątnym polu, lub jeśli chcesz wejść anonimowo kliknij dolny przycisk SIUP');
                }else{
                  let name = userInput.value.toLowerCase();
                  welcomeUsrName.innerHTML = name;
                  // dodac tekst specyficzny dla inputu 
                    for (member in data){
                        if(data[member].name.includes(name)){
                            welcomeUsrCaption.innerHTML = data[member].caption;
                        }
                    }
                    hideIntroduction();
                }
            });

            anonimBtn.addEventListener('click', hideIntroduction);
        },

        showPoints() { 
            const submitTestBtn = document.querySelector('.mamrotki-test .button');
            const anonimScore = document.querySelector('.anonim-score span');
            const btnContent = document.querySelector('.mamrotki-test .world-link span');
            const orderImg = document.querySelector('.order-container img');
            
            submitTestBtn.addEventListener('click', function (event) {

                event.preventDefault();
                document.querySelector('.order-container p').classList.add('refresh-tip');

                let numOr0 = n => isNaN(n) ? 0 : n
                app.data.points = app.data.points.reduce((a, b) => numOr0(a) + numOr0(b));

                    anonimScore.innerHTML = app.data.points;
                    btnContent.style.fontSize = "24px";
                    
                    if(app.data.points < app.data.maxPoints && app.data.points > app.data.maxPoints/2 ){
                        btnContent.innerText = 'gratulacje  kotku!';
                    }else if(app.data.points === app.data.maxPoints){
                        btnContent.innerText = 'Brawo! Uroczyście przyznajemy Ci order oraz chwałę i sławę, na wieki.';
                        orderImg.style.display = "block";
                        orderImg.classList.add('order-animate');
                    }
                    else{
                        btnContent.innerText = 'mogło być lepiej, miau';
                    }
                    submitTestBtn.style.pointerEvents = "none";
                
            });
        },

        init() {
            this.initData();
            this.initTest();
            this.getName();
            this.showPoints();
        }
    }

    app.init();

}