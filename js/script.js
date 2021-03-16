// ANIMATING TYPEING EFFECT 

let index = 0;
const typeingTitle = document.querySelector(".oval-background h1");
const text = "Maya's Worlds";

function typeing() {

    let letter = text.slice(0, ++index);
    typeingTitle.textContent = letter;

    let timer = setTimeout(typeing, 500);
    if (timer > 50) {
        clearTimeout(timer);
        
    }
};

document.addEventListener("DOMContentLoaded", typeing());

//ANIMATING WELCOME CAPTION

const caption = document.querySelector('.welcome .welcome-caption');
const welcomeSection = document.querySelector('.welcome');
const mamRocket = document.querySelector('.mamrotek-rakieta-container');
const mamRocketImg = document.querySelector('.mamrotek-rakieta');
const kopulyImg = document.querySelector('.kopuly-img');

gsap.fromTo(caption, { y: '+=100', opacity: '0' }, {
    y: '0', opacity: '1', duration: 1, ease: 'easeInOut', scrollTrigger: {
        trigger: welcomeSection,
        start: 'top 35%'
    }
});

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

gsap.to(kopulyImg, {
    y: -35, duration: 1, scrollTrigger: {
        trigger: kopulyImg,
        start: 'top 35%',
        end: 'bottom 70%',
        scrub: 1
    }
});

/* TO DO's
-odjezdza rakieta zle w mobile
-odsuwanie img kopuł podczas scrolowania po sekcji sisters jest zależne od pikseli, przez co mobile się rozjeżdza
-rozmiar czcionki w sekcji sisters w mobile jest za duży 
-czemu po scrolowaniu ponizej home animacja typeingu sie zatrzymuje bez progresu ?
*/

