$(document).ready(function() {
      const mySwiperPractice = new Swiper('.mySwiperPractice', {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,          
        }
    });
     
    document.getElementById('prevBtnPr')?.addEventListener('click', () => mySwiperPractice.slidePrev());
    document.getElementById('prevBtnPr1')?.addEventListener('click', () => mySwiperPractice.slidePrev());
    document.getElementById('nextBtnPr')?.addEventListener('click', () => mySwiperPractice.slideNext());  
    });