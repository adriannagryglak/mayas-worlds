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
            submitTestBtn.addEventListener('click', function (event) {
                event.preventDefault();
                app.data.points.push(pointsForQuestion);
            });
        }
    }

    class User {
        constructor(id, points) {
            this.id = id;
            this.points = points;
            console.log('THIS USER:', this);
        }
    }

    const app = {
        initData: function () {
            this.data = dataSource;
            this.data.points = [];
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

        getName: function () {
            const confirmUserBtn = document.querySelector('.confirm-user');
            const userInput = document.querySelector('.create-user input');
            const userDiv = document.querySelector('.create-user');

            confirmUserBtn.addEventListener('click', function () {
                app.data.name = userInput.value;
                document.querySelector('.welcome-caption span').innerHTML = app.data.name;
                userDiv.style.display = "none";
                console.log('mamy imie', app.data.name);
            });

        },

        createUser: function () {
            const submitTestBtn = document.querySelector('.button');

            submitTestBtn.addEventListener('click', function (event) {
                event.preventDefault();
                let numOr0 = n => isNaN(n) ? 0 : n
                app.data.points = app.data.points.reduce((a, b) => numOr0(a) + numOr0(b));
                new User(app.data.name, app.data.points);
                console.log(app.data);
            });
        },

        init: function () {
            this.initData();
            this.initTest();
            this.getName();
            this.createUser();
        }
    }

    app.init();

}