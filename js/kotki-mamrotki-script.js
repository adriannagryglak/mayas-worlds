/* global Handlebars*/
{
    'use strict'

    class Question {
        constructor(id, data) {       //this- to pojedyncza instancja tej klasy w domysle 'thisQuestion' 
            this.id = id;           //bez przypisania dane sa niewykrozystane 
            this.data = data;

            this.rendertoTest();
            this.checkIfCorrect();
        }

        createDOMFromHTML(htmlString) {
            let div = document.createElement('div');
            div.innerHTML = htmlString.trim();
            return div.firstChild;
        }

        rendertoTest() {

            const template = document.getElementById("question-template").innerHTML; //pobierz szablon
            const fillTemplateWith = Handlebars.compile(template); //użyj go w funkci stworzonej
            let newHtml = fillTemplateWith(this.data); //użyj funckji z danymi

            //tworzymy element dom z naszego html jako wlasciwosc instacji- by miec pozniej do tego dostep ! przy uzyciu pozyczonej funkcji
            this.element = this.createDOMFromHTML(newHtml);
            //wstawiamy na strone nasz element
            const testContainer = document.querySelector('#test');
            testContainer.appendChild(this.element);

        }

        checkIfCorrect() {

            let pointsForQuestion
            let trueAnswear

            //which answear is true
            for (let option in this.data.options) {
                if (this.data.options[option].length == 2) {
                    trueAnswear = option
                }
            }

            //which is chosen
            let options = this.element.querySelectorAll('.question li'); //choosing only one answear
            for (let option of options) {
                option.addEventListener('click', function () {
                    pointsForQuestion = 0;
                    for (let option of options) {
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

            const submitTestBtn = document.querySelector('.button');
            submitTestBtn.addEventListener('mouseover', function(){
            
            console.log(pointsForQuestion);
            });
        }
    }

    class User {
        constructor(id) {
            this.id = id;
            this.points = 0;
            console.log('THIS USER:', this);
            document.querySelector('.welcome-caption span').innerHTML = id;

        }

        pointsCounting (){
            //sumowanie punktow z kazdego pytania ? zapisania jako this.points
            console.log('pointscountign lol');
        }
    }

    const app = {
        initData: function () {
            this.data = dataSource;
        },
        initTest: function () {

            for (let question in this.data.questions) {
                new Question(question, this.data.questions[question]); //dla kazdego pytania tworzy instancje przekazując dane 'nazwe' i to co po niej w data.js
            }

            //animate test
            const testSection = document.querySelector('.mamrotki-test');
            const img = document.querySelector('.img-hint');
            const caption = document.querySelector('.p-hint');

            gsap.set(img, { y: '-550' });

            gsap.fromTo(img, { x: '-700' }, {
                x: '0', ease: 'easeInOut', duration: 2, scrollTrigger: {
                    trigger: img,
                    start: 'top 45%',
                }
            });
            gsap.fromTo(caption, { x: '-700' }, {
                x: '0', ease: 'easeInOut', duration: 2, scrollTrigger: {
                    trigger: img,
                    start: 'top 45%'
                }
            });
        },

        createUser: function () {

            const confirmUserBtn = document.querySelector('.confirm-user');
            const userInput = document.querySelector('.create-user input');
            const userDiv = document.querySelector('.create-user');

            confirmUserBtn.addEventListener('click', function(){
                console.log('created new user!');
                new User(userInput.value);
                userDiv.style.display="none";
            });

            //when no to siup wyslij punkty na str głowną

        },

        init: function () {
            this.createUser();
            this.initData();
            this.initTest();

        }
    }

    app.init();

}