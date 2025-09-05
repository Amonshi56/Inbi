$(document).ready(function() {
  // Initialize animations on scroll
  initScrollAnimations();
  
  // Initialize carousel functionality
  initCarousels();
  
  // Initialize smooth scrolling
  initSmoothScrolling();
  
  // Initialize form handling
  initFormHandling();

  // Swiper карусели
  const swiper = new Swiper('.mySwiper', {
      slidesPerView: 3,
      spaceBetween: 20,
      breakpoints: {
        0: { 
          slidesPerView: 1,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
         },
        1024: { slidesPerView: 1 },
        1025: { slidesPerView: 3 }
      }
  });
   
  document.getElementById('prevBtn')?.addEventListener('click', () => swiper.slidePrev());
  document.getElementById('prevBtn1')?.addEventListener('click', () => swiper.slidePrev());
  document.getElementById('nextBtn')?.addEventListener('click', () => swiper.slideNext());  

  const swiperPr = new Swiper('.mySwiperPr', {
      slidesPerView: 4,
      spaceBetween: 20,
      breakpoints: {
        0: { slidesPerView: 1 },
        800: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1025: { slidesPerView: 4 }
      }
  });
   
  document.getElementById('prevBtnPr')?.addEventListener('click', () => swiperPr.slidePrev());
  document.getElementById('prevBtnPr1')?.addEventListener('click', () => swiperPr.slidePrev());
  document.getElementById('nextBtnPr')?.addEventListener('click', () => swiperPr.slideNext());  

  const mySwiperPhotoM = new Swiper('.mySwiperPhotoM', {
    slidesPerView: "auto",    
    spaceBetween: 1,                      
    freeMode: true      
  });
});

// Scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        $(entry.target).addClass('loaded');
        
        $(entry.target).find('.fade-in').each(function(index) {
          const delay = index * 100;
          $(this).css('animation-delay', delay + 'ms');
          $(this).addClass('loaded');
        });
      }
    });
  }, observerOptions);

  $('.fade-in').each(function() {
    observer.observe(this);
  });
}

// Carousel functionality
function initCarousels() {
  let currentEventIndex = 0;
  let currentPracticeIndex = 0;
  
  $('#nextEvent').click(function() {
    currentEventIndex = (currentEventIndex + 1) % 3;
    updateEventsCarousel();
  });
  
  $('#prevEvent').click(function() {
    currentEventIndex = (currentEventIndex - 1 + 3) % 3;
    updateEventsCarousel();
  });
  
  $('#nextPractice').click(function() {
    currentPracticeIndex = (currentPracticeIndex + 1) % 4;
    updatePracticesCarousel();
  });
  
  $('#prevPractice').click(function() {
    currentPracticeIndex = (currentPracticeIndex - 1 + 4) % 4;
    updatePracticesCarousel();
  });
  
  function updateEventsCarousel() {
    $('#eventsCarousel').fadeOut(200).fadeIn(200);
  }
  
  function updatePracticesCarousel() {
    $('.practice-card').parent().fadeOut(200).fadeIn(200);
  }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
  $('a[href^="#"]').click(function(e) {
    e.preventDefault();
    
    const target = $(this.getAttribute('href'));
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top - 100
      }, 800, 'easeInOutQuart');
    }
  });
}

// Form handling
function initFormHandling() {
  $('form').submit(function(e) {
    e.preventDefault();
    
    const formData = {
      fullName: $('#fullName').val(),
      email: $('#email').val(),
      phone: $('#phone').val()
    };
    
    if (!formData.fullName || !formData.email || !formData.phone) {
      showAlert('Пожалуйста, заполните все поля', 'warning');
      return;
    }
    
    showAlert('Спасибо за регистрацию! Мы свяжемся с вами в ближайшее время.', 'success');
    this.reset();
  });
}

// Utility functions
function showAlert(message, type) {
  const alertHtml = `
    <div class="alert alert-${type} alert-dismissible fade show position-fixed" 
         style="top: 100px; right: 20px; z-index: 9999; min-width: 300px;">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
  `;
  
  $('body').append(alertHtml);
  
  setTimeout(function() {
    $('.alert').alert('close');
  }, 5000);
}

// Add easing function
$.easing.easeInOutQuart = function(x, t, b, c, d) {
  if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
  return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
};

// Interactive effects
$(document).on('click', '.practice-card', function() {
  $(this).addClass('animate__animated animate__pulse');
  setTimeout(() => {
    $(this).removeClass('animate__animated animate__pulse');
  }, 1000);
});

$('.card').hover(
  function() { $(this).addClass('shadow-lg'); },
  function() { $(this).removeClass('shadow-lg'); }
);

$('button[type="submit"]').click(function() {
  const $btn = $(this);
  const originalText = $btn.text();
  
  $btn.prop('disabled', true)
      .html('<span class="spinner-border spinner-border-sm me-2"></span>Отправка...');
  
  setTimeout(function() {
    $btn.prop('disabled', false).text(originalText);
  }, 2000);
});

// Parallax effect
$(window).scroll(function() {
  const scrolled = $(window).scrollTop();
  const parallax = $('.hero-section');
  const speed = scrolled * 0.5;
  
  parallax.css('background-position', 'center ' + speed + 'px');
});

// Counter animation
function animateCounters() {
  $('.counter').each(function() {
    const $this = $(this);
    const countTo = $this.attr('data-count');
    
    $({ countNum: $this.text() }).animate({
      countNum: countTo
    }, {
      duration: 2000,
      easing: 'linear',
      step: function() { $this.text(Math.floor(this.countNum)); },
      complete: function() { $this.text(this.countNum); }
    });
  });
}

const statsObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      animateCounters();
      statsObserver.unobserve(entry.target);
    }
  });
});

if ($('.statistics-section').length) {
  statsObserver.observe($('.statistics-section')[0]);
}

// AOS initialization for desktop
AOS.init({
  duration: 800,
  once: true,
  disable: window.innerWidth < 1024 // отключаем эффекты, но не ломаем видимость
});



$('[data-fancybox="video-gallery"]').fancybox({
  youtube: {
      controls: 1,
      showinfo: 0,
      rel: 0
  },
  vimeo: {
      color: 'f00'
  },
  toolbar: true,
  smallBtn: true,
  iframe: {
      preload: false
  },
  video: {
      autoStart: true,
      ratio: 16/9
  },
  animationEffect: 'zoom-in-out',
  animationDuration: 300,
  transitionEffect: 'slide',
  transitionDuration: 300,
  buttons: [
      'zoom',
      'slideShow',
      'fullScreen',
      'close'
  ],
  // Специальные настройки для мобильных
  mobile: {
    clickContent: function(current, event) {
      return current.type === 'video' ? 'toggleControls' : false;
    },
    clickSlide: function(current, event) {
      return current.type === 'video' ? 'toggleControls' : 'close';
    }
  },
  // Настройки размера для мобильных
  beforeShow: function(instance, current) {
    console.log('Fancybox opening video:', current.src);
    // Для мобильных устройств
    if (window.innerWidth <= 768) {
      instance.group[instance.currIndex].opts.width = '100%';
      instance.group[instance.currIndex].opts.height = '100%';
      instance.group[instance.currIndex].opts.margin = [0, 0];
    }
  },
  // afterShow: function(instance, current) {
  //   console.log('Fancybox video opened');
  //   // Для мобильных - скрываем некнужные элементы
  //   if (window.innerWidth <= 768) {
  //     $('.fancybox-content').css({
  //       'width': '100%',
  //       'height': 'auto',
  //       'max-width': '100%',
  //       'max-height': '100%'
  //     });
  //   }
  // }
});

// Обработка видео превью
document.querySelectorAll('.practice-video-card').forEach((card, index) => {
  const video = card.querySelector('video');
  const poster = card.querySelector('.video-poster');
  const statusEl = card.querySelector('.video-status');
  const loadingIndicator = card.querySelector('.loading-indicator');
  const playOverlay = card.querySelector('.play-overlay');
  
  if (video) {
      console.log(`Initializing video ${index + 1}:`, video.src);
      
      // Показываем индикатор загрузки
      if (loadingIndicator) loadingIndicator.style.display = 'block';
      
      // Обработчики событий загрузки видео
      video.addEventListener('loadstart', function() {
          console.log(`Video ${index + 1} started loading:`, video.src);
          if (statusEl) statusEl.textContent = 'Загрузка...';
      });

      video.addEventListener('loadedmetadata', function() {
          console.log(`Video ${index + 1} metadata loaded:`, video.src);
          if (loadingIndicator) loadingIndicator.style.display = 'none';
          card.classList.add('video-loaded');
          if (statusEl) statusEl.textContent = 'Наведите для просмотра';
      });

      video.addEventListener('canplaythrough', function() {
          console.log(`Video ${index + 1} can play through:`, video.src);
          if (statusEl) statusEl.textContent = 'Кликните для полного просмотра';
      });

      video.addEventListener('error', function(e) {
          console.error(`Video ${index + 1} failed to load:`, video.src, e);
          if (loadingIndicator) loadingIndicator.style.display = 'none';
          if (poster) {
              poster.style.display = 'flex';
              const titleEl = poster.querySelector('.video-title');
              if (titleEl) titleEl.textContent = 'Видео недоступно';
          }
          if (statusEl) statusEl.textContent = 'Ошибка загрузки';
      });

      // Проверяем, поддерживает ли устройство touch
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      if (isTouchDevice) {
          // Для мобильных устройств - используем touchstart/touchend
          let touchTimer;
          
          card.addEventListener('touchstart', function(e) {
              if (video.readyState >= 3) {
                  console.log(`Starting mobile preview for video ${index + 1}`);
                  card.classList.add('playing');
                  video.currentTime = 0;
                  video.volume = 0.3; // Устанавливаем громкость на 30%
                  
                  const playPromise = video.play();
                  if (playPromise !== undefined) {
                      playPromise.then(() => {
                          console.log(`Video ${index + 1} mobile preview started`);
                      }).catch(e => {
                          console.log(`Video ${index + 1} mobile preview blocked:`, e);
                          if (playOverlay) playOverlay.style.opacity = '1';
                      });
                  }
                  
                  // Автоматически останавливаем через 3 секунды
                  touchTimer = setTimeout(() => {
                      card.classList.remove('playing');
                      video.pause();
                      video.currentTime = 0;
                      if (playOverlay) playOverlay.style.opacity = '0';
                  }, 3000);
              }
          });
          
          card.addEventListener('touchend', function() {
              // Очищаем таймер если пользователь убрал палец
              clearTimeout(touchTimer);
              setTimeout(() => {
                  card.classList.remove('playing');
                  video.pause();
                  video.currentTime = 0;
                  if (playOverlay) playOverlay.style.opacity = '0';
              }, 500); // Даем небольшую задержку
          });
          
      } else {
          // Для десктопа - используем mouse события
          card.addEventListener('mouseenter', function() {
              if (video.readyState >= 3) { // HAVE_FUTURE_DATA
                  console.log(`Starting preview for video ${index + 1}`);
                  card.classList.add('playing');
                  video.currentTime = 0;
                  video.volume = 0.3; // Устанавливаем громкость на 30%
                  
                  const playPromise = video.play();
                  if (playPromise !== undefined) {
                      playPromise.then(() => {
                          console.log(`Video ${index + 1} preview started`);
                      }).catch(e => {
                          console.log(`Video ${index + 1} preview blocked:`, e);
                          if (playOverlay) playOverlay.style.opacity = '1';
                      });
                  }
              }
          });
          
          card.addEventListener('mouseleave', function() {
              card.classList.remove('playing');
              video.pause();
              video.currentTime = 0;
              if (playOverlay) playOverlay.style.opacity = '0';
          });
      }

      // Принудительная загрузка видео
      video.load();
  }
});


// Предотвращаем клик по кнопке от открытия галереи
$('.practiceBtn').click(function(e) {
  e.preventDefault();
  e.stopPropagation();
  console.log('Practice button clicked:', $(this).text());
  // Здесь можно добавить переход на страницу практики
});

// Анимация появления при скролле
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
      }
  });
}, observerOptions);

// Применяем анимацию к карточкам
document.querySelectorAll('.pr-card-video-conteiner').forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = `all 0.6s ease ${index * 0.1}s`;
  observer.observe(card);
});

console.log('Fancybox initialized for video gallery');
console.log('Found video elements:', $('[data-fancybox="video-gallery"]').length);


