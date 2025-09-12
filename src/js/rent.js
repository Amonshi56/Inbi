const mySwiperPhotoM = new Swiper('.mySwiperPhotoMR', {
    slidesPerView: 1,    
    centeredSlides: true, 
    loop: true,   
    
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }
  });

const mySwiperPhotoMS = new Swiper('.mySwiperPhotoMRS', {
slidesPerView: 1,    
centeredSlides: true, 
loop: true,   

navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
    }
});  

const swiper = new Swiper('.mySwiper', {
    slidesPerView: 3,
    breakpoints: {
      0: { 
        slidesPerView: 1,
       },
      1024: { slidesPerView: 1 },
      1025: { slidesPerView: 3 }
    }
});
 
document.getElementById('prevBtn')?.addEventListener('click', () => swiper.slidePrev());
document.getElementById('prevBtn1')?.addEventListener('click', () => swiper.slidePrev());
document.getElementById('nextBtn')?.addEventListener('click', () => swiper.slideNext());  

document.getElementById("bookingForm").addEventListener("submit", function(e) {
    e.preventDefault(); // отменяем стандартную отправку
  
    let valid = true;
  
    // поля
    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const agree = document.getElementById("agree");
  
    // очищаем старые ошибки
    [fullName, email, phone].forEach(el => el.classList.remove("error"));
  
    // проверка имени
    if (fullName.value.trim() === "") {
      fullName.classList.add("error");
      valid = false;
    }
  
    // проверка email (простая)
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email.value.trim())) {
      email.classList.add("error");
      valid = false;
    }
  
    // проверка телефона (минимум 7 цифр)
    const phonePattern = /^[0-9\-\+\s\(\)]{7,}$/;
    if (!phonePattern.test(phone.value.trim())) {
      phone.classList.add("error");
      valid = false;
    }
  
    // проверка чекбокса
    if (!agree.checked) {
      alert("Вы должны согласиться с обработкой данных.");
      valid = false;
    }
  
    if (valid) {
      alert("Форма успешно отправлена!");
      // здесь можно отправить форму через AJAX или просто form.submit()
      // this.submit();
    }
  });