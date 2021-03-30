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
        rendertoTest() {

            const template = document.getElementById("question-template").innerHTML; //pobierz szablon
            const fillTemplateWith = Handlebars.compile(template); //użyj go w funkci stworzonej
            let newHtml = fillTemplateWith(this.data); //użyj funckji z danymi
            document.getElementById("test").innerHTML += newHtml; // wstaw na naszą strone

            
        }
        checkIfCorrect(){


         
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

            //animate 
            const testSection = document.querySelector('.mamrotki-test');
            const img = document.querySelector('.img-hint');
            const caption = document.querySelector('.p-hint');
        
            gsap.set(img, {y: '-550'});
        
            gsap.fromTo(img, {x: '-700'},{x: '0', ease: 'easeInOut', duration : 2, scrollTrigger: {
                trigger: img,
                start: 'top 45%',
            }});
            gsap.fromTo(caption, {x: '-700'},{x: '0', ease: 'easeInOut', duration : 2, scrollTrigger: {
                trigger: img,
                start: 'top 45%'
            }});
        },
        checkTest: function () {

            const options = document.querySelectorAll('.question li');
            for (let option of options){
                option.addEventListener('click', function(){

                    //nadaj klase 'choosed'
                    //sprawdz czy ma element true
                    //jesli ma to co? 
                    console.log('KLIK');
                })
            }
        },
        init: function () {
            this.initData();
            this.initTest();
            this.checkTest();
        }
    }

    app.init();

}