// swiper logic  
function swiperInit() {
    document.querySelectorAll('.slider').forEach((slider) => {
        const swiper = new Swiper(slider.querySelector('.swiper'), {
            loop: false,
            speed: 400,
            navigation: {
                nextEl: slider.querySelector('.slider__button-next'),
                prevEl: slider.querySelector('.slider__button-prev'),
            },
            on: {
                slideChangeTransitionStart: () => {
                    disableSlideAnimation(slider);
                },
                slideChange: () => {
                    updateCurrentSlide(swiper,slider);
                },
                slideChangeTransitionEnd: () => {
                    enableSlideAnimation(slider);
                },
            }
        });
        allSlides(slider);
        updateCurrentSlide(swiper,slider);
    });
}

const allSlides = (slider) => {
    const allCount = slider.querySelector('.slider__count-all');
    const slides = slider.querySelectorAll('.swiper-slide');
    const totalSlides = slides.length;
    
    const formatNumber = (num) => num.toString().padStart(3, '0');
    allCount.innerHTML = formatNumber(totalSlides);
    
}

const updateCurrentSlide = (swiper, slider) => {
    const currentCount = slider.querySelector('.slider__count-current');
    const formatNumber = (num) => num.toString().padStart(3, '0');
    currentCount.innerHTML = formatNumber(swiper.activeIndex + 1);
};

const disableSlideAnimation = (slider) => {
    const slides = slider.querySelectorAll('.swiper-slide');
    slides.forEach((slide) => {
        slide.style.opacity = 0;
        slide.querySelectorAll('[data-aos]').forEach((element) => {
            element.classList.remove('aos-init', 'aos-animate');
        });
    });
};

const enableSlideAnimation = (slider) => {
    const currentSlide = slider.querySelector('.swiper-slide-active');
    currentSlide.style.opacity = 1;
    AOS.init();
};

window.addEventListener("DOMContentLoaded", () => {
    swiperInit();
    AOS.init();
})
