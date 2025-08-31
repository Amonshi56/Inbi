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

  const mySwiperPhoto = new Swiper('.mySwiperPhoto', {
    slidesPerView: 4,
    spaceBetween: 20,
    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      992: { slidesPerView: 2 }
    }
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

lightGallery(document.getElementById("lightgallery"), {
  plugins: [lgZoom, lgVideo],
  speed: 500,
  download: false
});