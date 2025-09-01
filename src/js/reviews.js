const reviewForm = document.getElementById("reviewForm");
const reviewText = document.getElementById("reviewText");
const reviewImages = document.getElementById("reviewImages");
const imagePreview = document.getElementById("imagePreview");
const reviewsList = document.getElementById("reviewsList");

const fileInput = document.getElementById("reviewImages");
const fileBtn = document.getElementById("fileBtn");

fileBtn.addEventListener("click", () => {
  fileInput.click();
});

const form = document.getElementById("reviewForm");
    form.addEventListener("submit", e => {
      e.preventDefault();

      const text = document.getElementById("reviewText").value;
      const rating = form.rating.value; 

      if(!rating) {
        alert("Пожалуйста, выберите количество звёзд!");
        return;
      }

      console.log("Отзыв:", text, "Рейтинг:", rating);
      alert(`Спасибо за отзыв! Рейтинг: ${rating} звёзд`);

      form.reset();
    });



let imagesArray = [];

// Обработка выбора файлов
reviewImages.addEventListener("change", (e) => {
  const files = Array.from(e.target.files);
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const imgSrc = event.target.result;
      imagesArray.push(imgSrc);
      renderImagePreviews();
    };
    reader.readAsDataURL(file);
  });
  reviewImages.value = ""; 
});

// Отрисовка миниатюр
function renderImagePreviews() {
  imagePreview.innerHTML = "";
  imagesArray.forEach((src, index) => {
    const div = document.createElement("div");
    div.classList.add("thumb");
    div.innerHTML = `<img src="${src}" alt="Фото">
                     <button type="button">&times;</button>`;
    div.querySelector("button").addEventListener("click", () => {
      imagesArray.splice(index, 1);
      renderImagePreviews();
    });
    imagePreview.appendChild(div);
  });
}

// Отправка формы
// reviewForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   if (!reviewText.value.trim() && imagesArray.length === 0) return;

//   const card = document.createElement("div");
//   card.classList.add("review-card");
//   card.innerHTML = `<p>${reviewText.value}</p>`;
  
//   if (imagesArray.length > 0) {
//     const imagesDiv = document.createElement("div");
//     imagesDiv.classList.add("review-images");
//     imagesArray.forEach(src => {
//       const img = document.createElement("img");
//       img.src = src;
//       imagesDiv.appendChild(img);
//     });
//     card.appendChild(imagesDiv);
//   }

//   reviewsList.prepend(card); // добавляем в начало списка
//   reviewText.value = "";
//   imagesArray = [];
//   renderImagePreviews();
// });

document.querySelectorAll('.filter-group').forEach(group => {
    const label = group.querySelector('.filter-label');
    label.addEventListener('click', () => {
      group.classList.toggle('open');
    });

    // Закрытие при клике вне
    document.addEventListener('click', (e) => {
      if (!group.contains(e.target)) {
        group.classList.remove('open');
      }
    });
  });

    const reviewsData = [
        {
          id: 1,
          user: "Анна Петрова",
          city: "Москва",
          practice: "Цигун",
          source: "Сайт",
          text: "Даосские практики - это инструмент на пути развития. За многолетнее соприкосновение с ними произошли существенные изменения на физическом, энергетическом и ментальном планах: улучшение здоровья и самочувствия, чувствование тела, развитие жизненности.",
          date: "25.06.25",
          stars: 5,
          photos: [
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop"
          ]
        },
        {
          id: 2,
          user: "Мария Иванова",
          city: "Санкт-Петербург",
          practice: "Тайцзицюань",
          source: "Telegram",
          text: "От тела к духу - так бы я обозначила свой практический путь. Начав работу с телом, улучшила здоровье, внешний вид. Продолжая заниматься, выравнивала эмоциональный фон. Подключилось сосредоточение, что привело к фокусировке.",
          date: "24.06.25",
          stars: 5,
          photos: [
            "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop"
          ]
        },
        {
          id: 3,
          user: "Елена Смирнова",
          city: "Екатеринбург",
          practice: "Железная рубашка",
          source: "VK",
          text: "Даосские практики первоначально позволяли мне решать локальные задачи с телом, сознанием и этого мне было достаточно. В процессе изучения практика стала для меня набором инструментов, позволяющих отремонтировать не только тело, но и многочисленные моменты жизни.",
          date: "23.06.25",
          stars: 5,
          photos: []
        },
        {
          id: 4,
          user: "Ольга Коваленко",
          city: "Новосибирск",
          practice: "Цигун",
          source: "Instagram",
          text: "Второй год занимаюсь даосскими практиками и все больше погружаюсь и пытаюсь осознать их глубину! Практики помогли мне узнать мое тело изнутри и убрать болезни которые накопила в течение жизни!",
          date: "22.06.25",
          stars: 5,
          photos: [
            "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop"
          ]
        },
        {
          id: 5,
          user: "Татьяна Волкова",
          city: "Казань",
          practice: "Тайцзицюань",
          source: "Сайт",
          text: "Начала 25 лет назад с Цигун Железная рубашка, далее Тайцзицюань, видела воочию Чэнь Сяована, далее огромный перерыв и возврат к практикам у Олега Михайловича. Продолжаю развиваться.",
          date: "21.06.25",
          stars: 5,
          photos: []
        },
        {
          id: 6,
          user: "Светлана Морозова",
          city: "Ростов-на-Дону",
          practice: "Цигун",
          source: "Telegram",
          text: "Я начала заниматься даосскими практиками за год до беременности. Но даже этого хватило, чтобы подготовить организм к такому событию, и он заметил нагрузки только, когда живот стал очень тяжелым.",
          date: "20.06.25",
          stars: 5,
          photos: [
            "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop"
          ]
        }
      ];
  
      // Настройки
      let currentPage = 1;
      const reviewsPerPage = 9;
      let showAllMode = false;
      let filteredReviews = [...reviewsData];
      let currentPhotoIndex = 0;
      let currentPhotos = [];
  
      // Выбранные фильтры
      let selectedCities = [];
      let selectedPractices = [];
    //   let selectedSources = [];
  
      // Элементы DOM
      const reviewsContainer = document.getElementById('reviewsContainer');
      const prevBtnP = document.getElementById('prevBtnP');
      const nextBtnP = document.getElementById('nextBtnP');
      const pageNumbers = document.getElementById('pageNumbers');
    //   const paginationInfo = document.getElementById('paginationInfo');
      const paginationContainer = document.getElementById('paginationContainer');
    //   const showAllBtn = document.getElementById('showAllBtn');
      const noResults = document.getElementById('noResults');
      
      // Фильтры
      const cityFilters = document.getElementById('cityFilters');
      const practiceFilters = document.getElementById('practiceFilters');
    //   const sourceFilters = document.getElementById('sourceFilters');
      const cityCounter = document.getElementById('cityCounter');
      const practiceCounter = document.getElementById('practiceCounter');
    //   const sourceCounter = document.getElementById('sourceCounter');
      
      // Модальное окно
      // const photoModal = document.getElementById('photoModal');
      // const modalImage = document.getElementById('modalImage');
      // const modalClose = document.getElementById('modalClose');
      // const prevPhoto = document.getElementById('prevPhoto');
      // const nextPhoto = document.getElementById('nextPhoto');

      function scrollToElement(element, offset = 0) {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }

  
      // Создание чекбоксов для фильтра
      function createCheckboxFilter(container, values, selectedArray, countElement, filterFunction) {
        container.innerHTML = '';
        
        values.forEach(value => {
          const item = document.createElement('div');
          item.className = 'filter-checkbox-item';
          
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.className = 'filter-checkbox';
          checkbox.id = `${container.id}_${value}`;
          checkbox.value = value;
          checkbox.checked = selectedArray.includes(value);
          
          const label = document.createElement('label');
          label.className = 'filter-checkbox-label';
          label.htmlFor = checkbox.id;
          label.textContent = value;
          
          checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
              if (!selectedArray.includes(value)) {
                selectedArray.push(value);
              }
            } else {
              const index = selectedArray.indexOf(value);
              if (index > -1) {
                selectedArray.splice(index, 1);
              }
            }
            
            updateCounter(countElement, selectedArray.length);
            filterFunction();
          });
          
          item.appendChild(checkbox);
          item.appendChild(label);
          container.appendChild(item);
        });
      }
  
      // Обновление счетчика
      function updateCounter(element, count) {
        if (count > 0) {
          element.textContent = count;
          element.style.display = 'inline';
        } else {
          element.style.display = 'none';
        }
      }
  
      // Инициализация фильтров
      function initializeFilters() {
        const cities = [...new Set(reviewsData.map(r => r.city))].sort();
        const practices = [...new Set(reviewsData.map(r => r.practice))].sort();
        
        createCheckboxFilter(cityFilters, cities, selectedCities, cityCounter, applyFilters);
        createCheckboxFilter(practiceFilters, practices, selectedPractices, practiceCounter, applyFilters);
      }
  
      // Применение фильтров
      function applyFilters() {
        filteredReviews = reviewsData.filter(review => {
          const cityMatch = selectedCities.length === 0 || selectedCities.includes(review.city);
          const practiceMatch = selectedPractices.length === 0 || selectedPractices.includes(review.practice);         
          return cityMatch && practiceMatch;
        });
        
        currentPage = 1;
        showAllMode = false;
        // showAllBtn.textContent = 'Показать все отзывы';
        displayReviews();
        updatePaginationControls();

      }
  
      // Создание звезд
      function createStars(count) {
        const starsContainer = document.createElement('div');
        starsContainer.className = 'stars';
        
        for (let i = 0; i < count; i++) {
            const star = document.createElement('img');
            star.src = './src/images/star.png'; 
            star.alt = '⭐'; 
            star.className = 'star'; 
            starsContainer.appendChild(star);
        }
        
        return starsContainer;
      }
  
      // Создание галереи фотографий
      function createPhotoGallery(photos) {
        if (!photos || photos.length === 0) return null;
        
        const gallery = document.createElement('div');
        gallery.className = 'review-gallery';
      
        photos.forEach((photo, index) => {
          // создаём ссылку
          const link = document.createElement('a');
          link.setAttribute('data-fancybox', 'gallery');
          link.href = photo; // ссылка на оригинал картинки
          link.setAttribute('data-lg-size', '1600-1067'); // можно задать размер (необязательно)
      
          // создаём превью
          const img = document.createElement('img');
          img.src = photo;
          img.className = 'gallery-thumbnail';
          img.alt = `Фото ${index + 1}`;
      
          // вложим картинку в ссылку
          link.appendChild(img);
          gallery.appendChild(link);
        });
        
        return gallery;
      }
  
      // Открытие модального окна с фото
      function openPhotoModal(photos, index) {
        currentPhotos = photos;
        currentPhotoIndex = index;
        modalImage.src = photos[index];
        photoModal.style.display = 'block';
        
        prevPhoto.style.display = photos.length > 1 ? 'block' : 'none';
        nextPhoto.style.display = photos.length > 1 ? 'block' : 'none';
      }
  
      // Навигация по фотографиям в модальном окне
      function showPrevPhoto() {
        currentPhotoIndex = (currentPhotoIndex - 1 + currentPhotos.length) % currentPhotos.length;
        modalImage.src = currentPhotos[currentPhotoIndex];
      }
  
      function showNextPhoto() {
        currentPhotoIndex = (currentPhotoIndex + 1) % currentPhotos.length;
        modalImage.src = currentPhotos[currentPhotoIndex];
      }
  
      // Создание карточки отзыва
      function createReviewCard(review) {
        const card = document.createElement('div');
        card.className = 'reviews-card-body';
        

        const cardTop = document.createElement('div');
        cardTop.className = 'cardTop';

        const cardBott = document.createElement('div');
        cardBott.className = 'cardBott';

        // Мета-информация
        const cardMeta = document.createElement('div');
        cardMeta.className = 'card-meta';
        
        const cityTag = document.createElement('span');
        cityTag.className = 'meta-tag city';
        cityTag.textContent = review.city;
        
        const practiceTag = document.createElement('span');
        practiceTag.className = 'meta-tag practice';
        practiceTag.textContent = review.practice;
        
        const sourceTag = document.createElement('span');
        sourceTag.className = 'meta-tag source';
        sourceTag.textContent = review.source;
        
        cardMeta.appendChild(cityTag);
        cardMeta.appendChild(practiceTag);
        cardMeta.appendChild(sourceTag);
        
        // Имя пользователя
        const userName = document.createElement('h6');
        userName.className = 'reviews-text user';
        userName.textContent = review.user;
        
        // Звезды
        const stars = createStars(review.stars);
        
        // Текст отзыва
        const text = document.createElement('p');
        text.className = 'reviews-text';
        text.textContent = review.text;
        
        // Галерея фотографий
        const gallery = createPhotoGallery(review.photos);
        
        // Дата
        const date = document.createElement('small');
        date.className = 'reviews-text rdate';
        date.textContent = review.date;
        
        // Сборка карточки
        cardTop.appendChild(stars);
        cardTop.appendChild(userName);
        if (gallery) cardTop.appendChild(gallery);
        cardTop.appendChild(text);
        cardBott.appendChild(cardMeta);
        cardBott.appendChild(date);

        card.appendChild(cardTop);
        card.appendChild(cardBott);
        
        return card;
      }
  
      // Отображение отзывов
      function displayReviews() {
        reviewsContainer.innerHTML = '';
        
        if (filteredReviews.length === 0) {
          noResults.style.display = 'block';
          paginationContainer.style.display = 'none';
        //   paginationInfo.textContent = '';
          return;
        } else {
          noResults.style.display = 'none';
        }
        
        if (showAllMode) {
          filteredReviews.forEach(review => {
            reviewsContainer.appendChild(createReviewCard(review));
          });
          paginationContainer.style.display = 'none';
        } else {
          const startIndex = (currentPage - 1) * reviewsPerPage;
          const endIndex = startIndex + reviewsPerPage;
          const currentReviews = filteredReviews.slice(startIndex, endIndex);
          
          currentReviews.forEach(review => {
            reviewsContainer.appendChild(createReviewCard(review));
          });
          
          paginationContainer.style.display = 'flex';
        }
      }
  
      // Создание кнопок страниц
      function createPageButtons() {
        pageNumbers.innerHTML = '';
        const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
        
        for (let i = 1; i <= totalPages; i++) {
          const pageBtn = document.createElement('button');
          pageBtn.className = 'pagination-btn';
          pageBtn.textContent = i;
          pageBtn.addEventListener('click', () => goToPage(i));
          
          if (i === currentPage) {
            pageBtn.classList.add('active');
          }
          
          pageNumbers.appendChild(pageBtn);
        }
      }
  
      // Переход на страницу
      function goToPage(page) {
        currentPage = page;
        displayReviews();
        updatePaginationControls();

        const filtersBlock = document.querySelector('.filter-group') || document.querySelector('.filters-container');
        if (filtersBlock) {
          scrollToElement(filtersBlock, 20); // 20px отступ сверху
        } else if (reviewsContainer) {
          scrollToElement(reviewsContainer, 100); // fallback к контейнеру отзывов
        }
      }
  
      // Обновление элементов управления пагинацией
      function updatePaginationControls() {
        const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
        prevBtnP.disabled = currentPage === 1;
        nextBtnP.disabled = currentPage === totalPages || totalPages === 0;
        
        createPageButtons();
      }
  
      // Обработчики событий для пагинации
      prevBtnP.addEventListener('click', () => {
        if (currentPage > 1) {
          goToPage(currentPage - 1);
        }
      });
  
      nextBtnP.addEventListener('click', () => {
        const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
        if (currentPage < totalPages) {
          goToPage(currentPage + 1);
        }
      });
  
      // Обработчик для кнопки "Показать все"
    //   showAllBtn.addEventListener('click', () => {
    //     if (showAllMode) {
    //       showAllMode = false;
    //       showAllBtn.textContent = 'Показать все отзывы';
    //       currentPage = 1;
    //     } else {
    //       showAllMode = true;
    //       showAllBtn.textContent = 'Показать с пагинацией';
    //     }
    //     displayReviews();
    //     updatePaginationControls();
    //   });
  
      // Обработчики событий для модального окна
      modalClose.addEventListener('click', () => {
        photoModal.style.display = 'none';
      });
  
      prevPhoto.addEventListener('click', showPrevPhoto);
      nextPhoto.addEventListener('click', showNextPhoto);
  
      // Закрытие модального окна при клике вне изображения
      photoModal.addEventListener('click', (e) => {
        if (e.target === photoModal) {
          photoModal.style.display = 'none';
        }
      });
  
      // Навигация по фото с клавиатуры
      document.addEventListener('keydown', (e) => {
        if (photoModal.style.display === 'block') {
          if (e.key === 'ArrowLeft') showPrevPhoto();
          if (e.key === 'ArrowRight') showNextPhoto();
          if (e.key === 'Escape') photoModal.style.display = 'none';
        }
      });
  
      // Инициализация при загрузке страницы
      document.addEventListener('DOMContentLoaded', () => {
        initializeFilters();
        displayReviews();
        updatePaginationControls();
      });
  
      // Если DOM уже загружен, запускаем инициализацию сразу
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          initializeFilters();
          displayReviews();
          updatePaginationControls();
        });
      } else {
        initializeFilters();
        displayReviews();
        updatePaginationControls();
      }
