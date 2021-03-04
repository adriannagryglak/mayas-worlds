const caption = document.querySelector('.welcome-caption .caption');
const welcomeSection = document.querySelector('.welcome-caption');
const mamRocket = document.querySelector('.mamrotek-rakieta-container');
const mamRocketImg = document.querySelector('.mamrotek-rakieta');

gsap.fromTo(caption, { y: '+=100', opacity: '0' }, {
    y: '0', opacity: '1', duration: 1, ease: 'easeInOut', scrollTrigger: {
        trigger: welcomeSection,
        start: 'top 30%'
    }
});

let animation = gsap.timeline({
    delay: 3, repeat: -1, repeatDelay: 2, scrollTrigger: {
        trigger: welcomeSection,
        start: 'top 30%',
    }
});

animation.to(mamRocket, { x: window.innerWidth + mamRocket.offsetWidth, duration: 10, ease: Linear.easeNone })
    .to(mamRocketImg, { y: 15, duration: 0.3, repeat: 14, yoyo: true }, 0)
    .to(mamRocket, { rotate: -40, duration: 2 }, 4.5)
    .to(mamRocket, { y: -welcomeSection.offsetHeight, duration: 4.5 }, 5.5);


