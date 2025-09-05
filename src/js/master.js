$(document).ready(function() {
const mySwiperPhotoM = new Swiper('.mySwiperPhotoM', {
    slidesPerView: "auto",    
    spaceBetween: 1,                      
    freeMode: true      
  });

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

const text = document.querySelector('.lead');
const btn = document.querySelector('.btn-more');

btn.addEventListener('click', () => {
  text.classList.toggle('expanded');
  btn.textContent = text.classList.contains('expanded') ? 'Свернуть' : 'Подробнее';
});

function toggleDay(element) {
  const dayContent = element.nextElementSibling;
  const isActive = element.classList.contains('active');
  
  if (isActive) {
      // Закрываем
      element.classList.remove('active');
      dayContent.classList.remove('active');
  } else {
      // Открываем
      element.classList.add('active');
      dayContent.classList.add('active');
  }
}

// Опционально: закрывать другие дни при открытии нового (аккордеон)
function toggleDayAccordion(element) {
  const allDayHeads = document.querySelectorAll('.day-head');
  const allDayContents = document.querySelectorAll('.day-content');
  const currentContent = element.nextElementSibling;
  const isActive = element.classList.contains('active');
  
  // Закрываем все дни
  allDayHeads.forEach(head => head.classList.remove('active'));
  allDayContents.forEach(content => content.classList.remove('active'));
  
  // Если текущий день не был активен, открываем его
  if (!isActive) {
      element.classList.add('active');
      currentContent.classList.add('active');
  }
}

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

const cards = document.querySelectorAll('.reviews-card-body');
const loadMoreBtn = document.getElementById('loadMore');
let visibleCount = 6; // сколько карточек видно сразу

function updateVisibleCards() {
  cards.forEach((card, index) => {
    card.style.display = index < visibleCount ? 'flex' : 'none';
  });
}

loadMoreBtn.addEventListener('click', () => {
  visibleCount += 4; // сколько добавляем карточек
  updateVisibleCards();

  if (visibleCount >= cards.length) {
    loadMoreBtn.style.display = 'none'; // скрываем кнопку, если все карточки показаны
  }
});

// стартовое отображение
updateVisibleCards();

document.addEventListener('click', function (e) {
  // ищем ближайшую кнопку (поддерживаем и класс, и возможный id)
  const btnREW = e.target.closest('.loadMoreRew, #loadMoreRew');
  if (!btnREW) return;

  // находим родительскую карточку и текст внутри неё
  const cardREW = btnREW.closest('.reviews-card-body');
  if (!cardREW) return;
  const textRew = cardREW.querySelector('.master-review-text');
  if (!textRew) return console.warn('master-review-text not found in card', cardREW);
  
  // переключаем класс и текст кнопки
  const expanded = textRew.classList.toggle('expanded');
  btnREW.textContent = expanded ? 'Скрыть' : 'Подробнее';
});