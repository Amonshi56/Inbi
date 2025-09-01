$('[data-fancybox="video-gallery"]').fancybox({
    // Настройки видео
    youtube: {
        controls: 1,
        showinfo: 0,
        rel: 0
    },
    vimeo: {
        color: 'f00'
    },
    
    // Основные настройки
    toolbar: true,
    smallBtn: true,
    iframe: {
        preload: false
    },
    
    // Настройки воспроизведения
    video: {
        autoStart: true,
        ratio: 16/9
    },
    
    // Анимация и интерфейс
    animationEffect: 'zoom-in-out',
    animationDuration: 300,
    transitionEffect: 'slide',
    transitionDuration: 300,
    
    // Кнопки управления
    buttons: [
        'zoom',
        'slideShow',
        'fullScreen',
        'close'
    ],
    
    // Колбеки
    beforeShow: function(instance, current) {
        console.log('Fancybox opening video:', current.src);
    },
    
    afterShow: function(instance, current) {
        console.log('Fancybox video opened');
    }
  });
  
  // Обработка видео для превью
  document.querySelectorAll('.practice-video-card').forEach((card, index) => {
    const video = card.querySelector('video');
    const poster = card.querySelector('.video-poster');
    const statusEl = card.querySelector('.video-status');
    const loadingIndicator = card.querySelector('.loading-indicator');
    const playOverlay = card.querySelector('.play-overlay');
    
    if (video) {
        // Показываем индикатор загрузки
        loadingIndicator.style.display = 'block';
        
        // Обработчики событий загрузки видео
        video.addEventListener('loadstart', function() {
            console.log(`Video ${index + 1} started loading:`, video.src);
            if (statusEl) statusEl.textContent = 'Загрузка...';
        });
  
        video.addEventListener('loadedmetadata', function() {
            console.log(`Video ${index + 1} metadata loaded:`, video.src);
            loadingIndicator.style.display = 'none';
            card.classList.add('video-loaded');
            if (statusEl) statusEl.textContent = 'Наведите для просмотра';
        });
  
        video.addEventListener('canplaythrough', function() {
            console.log(`Video ${index + 1} can play through:`, video.src);
            if (statusEl) statusEl.textContent = 'Кликните для полного просмотра';
        });
  
        video.addEventListener('error', function(e) {
            console.error(`Video ${index + 1} failed to load:`, video.src, e);
            loadingIndicator.style.display = 'none';
            if (poster) {
                poster.style.display = 'flex';
                poster.querySelector('.video-title').textContent = 'Видео недоступно';
            }
            if (statusEl) statusEl.textContent = 'Ошибка загрузки';
        });
  
        // Hover эффекты для превью
        card.addEventListener('mouseenter', function() {
            if (video.readyState >= 3) { // HAVE_FUTURE_DATA
                console.log(`Starting preview for video ${index + 1}`);
                card.classList.add('playing');
                video.currentTime = 0;
                
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
  