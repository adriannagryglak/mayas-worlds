/* global Handlebars*/
{

    'use strict'

    class Question {
        constructor(id, data) {       //this- to pojedyncza instancja tej klasy w domysle 'thisQuestion' 
            this.id = id;           //bez przypisania dane sa niewykrozystane 
            this.data = data;

            this.rendertoTest();
            console.log('instacja klasy Question :', this)
        }
        rendertoTest() {

            // Pobieramy HTML z szablonem
            const template = document.getElementById("question-template").innerHTML;

            // Kompilujemy szablon
            const fillTemplateWith = Handlebars.compile(template);

            // Wygenerowanie gotowego kodu z szablonu
            let newHtml = fillTemplateWith(this.data);

            // Wstawienie kodu na stronę
            document.getElementById("test").innerHTML += newHtml;


            
        }
    }


    const app = {
        initData: function () {
            this.data = dataSource;
        },
        initTest: function () {
            console.log('to moje data', this.data);
            for (let question in this.data.questions) {
                new Question(question, this.data.questions[question]); //dla kazdego pytania tworzy instancje przekazując dane 'nazwe' i to co po niej w data.js
            }
        },
        init: function () {
            this.initData();
            this.initTest();
        }

    }

    app.init();

}