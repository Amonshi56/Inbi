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
  
  const testScheduleData = {
      "2024-09-10": [ // Понедельник
        {
          id: 1,
          time: "10:30-12:00",
          title: "Цигун для начинающих",
          location: "moscow",
          room: "Большой зал",
          master: "ivan-petrov",
          masterName: "Иван Петров",
          direction: "qigong",
          class: "beginner"
        },
        {
          id: 2,
          time: "18:00-19:30",
          title: "Даосская женская йога",
          location: "online",
          room: "Онлайн",
          master: "anna-sidorova",
          masterName: "Анна Сидорова",
          direction: "yoga",
          class: "intermediate"
        }
      ],
      "2025-09-11": [ // Вторник
        {
          id: 3,
          time: "16:00-17:00",
          title: "Капоэйра для детей",
          location: "moscow",
          room: "Малый зал",
          master: "mike-johnson",
          masterName: "Майк Джонсон",
          direction: "capoeira",
          class: "kids"
        }
      ],
      "2025-09-09": [ // Среда
        {
          id: 4,
          time: "11:00-12:30",
          title: "Восточные танцы",
          location: "online",
          room: "Онлайн",
          master: "elena-kozlova",
          masterName: "Елена Козлова",
          direction: "dance",
          class: "beginner"
        },
        {
          id: 5,
          time: "19:00-20:30",
          title: "Тайцзи-цюань продвинутый",
          location: "moscow",
          room: "Большой зал",
          master: "ivan-petrov",
          masterName: "Иван Петров",
          direction: "taichi",
          class: "advanced"
        }
      ],
      "2025-09-19": [ // Пятница
        {
          id: 6,
          time: "17:30-19:00",
          title: "Латиноамериканская йога",
          location: "moscow",
          room: "Средний зал",
          master: "anna-sidorova",
          masterName: "Анна Сидорова",
          direction: "yoga",
          class: "intermediate"
        }
      ],
      "2025-09-14": [ // Суббота
        {
          id: 7,
          time: "10:30-12:00",
          title: "Капоэйра средний уровень",
          location: "moscow",
          room: "Большой зал",
          master: "mike-johnson",
          masterName: "Майк Джонсон",
          direction: "capoeira",
          class: "intermediate"
        },
        {
          id: 8,
          time: "14:00-15:30",
          title: "Сальса продвинутый",
          location: "online",
          room: "Онлайн",
          master: "elena-kozlova",
          masterName: "Елена Козлова",
          direction: "dance",
          class: "advanced"
        }
      ],
      "2025-09-16": [ // Понедельник следующей недели
        {
          id: 9,
          time: "09:00-10:30",
          title: "Утренняя медитация",
          location: "moscow",
          room: "Тихий зал",
          master: "ivan-petrov",
          masterName: "Иван Петров",
          direction: "meditation",
          class: "beginner"
        }
      ]
    };
  
    // Получаем текущую дату и время
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
    // Текущие данные расписания
    let currentScheduleData = {};
    // Устанавливаем текущую неделю на основе сегодняшней даты
    let currentWeek = getMonday(today);
  
    // Дни недели
    const dayNames = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
    const dayIds = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  
    // Месяцы на русском
    const months = [
      'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
      'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];
  
    // Функция для загрузки данных с сервера (заглушка)
    async function loadScheduleData(startDate, endDate) {
      // TODO: Заменить на реальный API запрос
      // const response = await fetch(`/api/schedule?start=${formatDateForAPI(startDate)}&end=${formatDateForAPI(endDate)}`);
      // return await response.json();
      
      // Пока используем тестовые данные
      return testScheduleData;
    }
  
    // Форматирование даты для API
    function formatDateForAPI(date) {
      return date.toISOString().split('T')[0];
    }
  
    // Функция для получения понедельника недели
    function getMonday(date) {
      const d = new Date(date);
      const day = d.getDay();
      const diff = d.getDate() - day + (day === 0 ? -6 : 1);
      return new Date(d.setDate(diff));
    }
  
    // Функция для форматирования даты
    function formatDate(date) {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      return `${day}.${month}`;
    }
  
    // Функция для форматирования диапазона недели
    function formatWeekRange(startDate) {
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 6);
      
      const startDay = startDate.getDate();
      const startMonth = months[startDate.getMonth()];
      const endDay = endDate.getDate();
      const endMonth = months[endDate.getMonth()];
      const year = endDate.getFullYear();
  
      if (startDate.getMonth() === endDate.getMonth()) {
        return `${startDay} - ${endDay} ${endMonth} ${year}`;
      } else {
        return `${startDay} ${startMonth} - ${endDay} ${endMonth} ${year}`;
      }
    }
  
    // Функция для проверки, прошло ли мероприятие
    function isEventPast(dateKey, timeString) {
      const eventDate = new Date(dateKey);
      const currentDateTime = new Date();
      
      // Если событие в другой день
      if (eventDate.toDateString() !== currentDateTime.toDateString()) {
        return eventDate < currentDateTime;
      }
      
      // Если событие сегодня, проверяем время
      const [endTimeStr] = timeString.split('-')[1] ? [timeString.split('-')[1]] : [timeString.split('-')[0]];
      if (endTimeStr) {
        const [hours, minutes] = endTimeStr.trim().split(':').map(Number);
        const eventEndTime = new Date(eventDate);
        eventEndTime.setHours(hours, minutes);
        
        return eventEndTime < currentDateTime;
      }
      
      return false;
    }
  
    // Создание карточки занятия
    function createClassCard(classData, dateKey) {
      const locationClass = classData.location === 'moscow' ? 'location-moscow' : 'location-online';
      const locationText = classData.location === 'moscow' ? 'В Москве' : 'Онлайн';
      const isPast = isEventPast(dateKey, classData.time);
      const pastClass = isPast ? 'past-event' : '';
      
      return `
        <div class="practice-card-body ${pastClass}" 
             data-location="${classData.location}" 
             data-master="${classData.master}" 
             data-direction="${classData.direction}" 
             data-class="${classData.class}"
             onclick="openClassModal(${classData.id})">
          <div class="practice-card-body-half">  
              <div class="practice-card-time">${classData.time}</div>
              <div class="practice-card-header">${classData.title}</div>
          </div>
          <div class=".practice-card-body-half-bot">     
              <div class="practice-card-info">${classData.room}</div>
              <div class="practice-card-info">${classData.masterName}</div>
              <div class="location-badge ${locationClass}" style="display: none;">${locationText}</div>
          </div>    
        </div>
      `;
    }
  
    // Функция для проверки, является ли день текущим
    function isToday(date) {
      return date.toDateString() === today.toDateString();
    }
  
    // Генерация расписания на неделю
    async function generateSchedule() {
      const container = document.getElementById('scheduleContainer');
      container.innerHTML = '';
  
      // Загружаем данные для текущей недели
      const endDate = new Date(currentWeek);
      endDate.setDate(endDate.getDate() + 6);
      
      currentScheduleData = await loadScheduleData(currentWeek, endDate);
  
      // Создаем контейнеры для каждого дня недели
      for (let i = 0; i < 7; i++) {
        const dayDate = new Date(currentWeek);
        dayDate.setDate(dayDate.getDate() + i);
        const dateKey = formatDateForAPI(dayDate);
        
        // Определяем, является ли этот день текущим
        const todayClass = isToday(dayDate) ? 'today' : '';
        
        const dayContainer = document.createElement('div');
        dayContainer.className = 'day-container';
        dayContainer.innerHTML = `
          <div class="day-head ${todayClass}" onclick="toggleDay(this)">
            <span>${dayNames[i]}</span><span><img src="./src/icons/day_dropdown.svg" alt="arrow" class="filter-icon"></span>
          </div>
          <div class="day-content">
          </div>
        `;
  
        // Добавляем занятия для этого дня
        const dayClasses = currentScheduleData[dateKey] || [];
        dayClasses.forEach(classData => {
          const innerDiv = dayContainer.querySelector(".day-content");
          if (innerDiv) {
            innerDiv.innerHTML += createClassCard(classData, dateKey);
          }
        });
        
        container.appendChild(dayContainer);
      }
  
      // Применяем текущие фильтры
      filterSchedule();
    }
  
    // Обновление отображения недели
    async function updateWeekDisplay() {
      const weekText = formatWeekRange(currentWeek);
      document.getElementById('weekText').textContent = weekText;
      document.getElementById('weekInfo').textContent = `${weekText}`;
      
      // Перегенерируем расписание
      await generateSchedule();
    }
  
    // Пагинация недель
    document.getElementById('prevWeek').addEventListener('click', async () => {
      currentWeek.setDate(currentWeek.getDate() - 7);
      await updateWeekDisplay();
    });
  
    document.getElementById('nextWeek').addEventListener('click', async () => {
      currentWeek.setDate(currentWeek.getDate() + 7);
      await updateWeekDisplay();
    });
  
    // Фильтры локации
    document.querySelectorAll('.location-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.location-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterSchedule();
      });
    });
  
    // Фильтрация расписания
    function filterSchedule() {
      const locationFilter = document.querySelector('.location-btn.active').dataset.location;
      const masterFilter = document.getElementById('masterFilter').value;
      const directionFilter = document.getElementById('directionFilter').value;
      const classFilter = document.getElementById('classFilter').value;
  
      const cards = document.querySelectorAll('.practice-card-body');
      
      cards.forEach(card => {
        let show = true;
  
        // Фильтр по локации
        if (locationFilter !== 'all') {
          if (card.dataset.location !== locationFilter) {
            show = false;
          }
        }
  
        // Фильтр по мастеру
        if (masterFilter && card.dataset.master !== masterFilter) {
          show = false;
        }
  
        // Фильтр по направлению
        if (directionFilter && card.dataset.direction !== directionFilter) {
          show = false;
        }
  
        // Фильтр по типу занятия
        if (classFilter && card.dataset.class !== classFilter) {
          show = false;
        }
  
        card.style.display = show ? 'block' : 'none';
      });
    }
  
    // Обработчики для выпадающих списков
    document.getElementById('masterFilter').addEventListener('change', filterSchedule);
    document.getElementById('directionFilter').addEventListener('change', filterSchedule);
    document.getElementById('classFilter').addEventListener('change', filterSchedule);
  
    // Календарь для выбора недели
    let calendarDate = new Date();
  
    function generateCalendar() {
      const year = calendarDate.getFullYear();
      const month = calendarDate.getMonth();
      
      document.getElementById('monthYear').textContent = `${months[month]} ${year}`;
      
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const startDate = new Date(firstDay);
      startDate.setDate(startDate.getDate() - (firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1));
      
      const grid = document.getElementById('calendarGrid');
      // Удаляем все даты (оставляем заголовки)
      const dates = grid.querySelectorAll('.calendar-date');
      dates.forEach(date => date.remove());
      
      // Генерируем 6 недель (42 дня)
      for (let i = 0; i < 42; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        
        const dateEl = document.createElement('div');
        dateEl.className = 'calendar-date';
        dateEl.textContent = date.getDate();
        
        if (date.getMonth() !== month) {
          dateEl.classList.add('other-month');
        }
        
        // Выделяем сегодняшний день в календаре
        if (isToday(date)) {
          dateEl.classList.add('today');
        }
        
        dateEl.addEventListener('click', async () => {
          const monday = getMonday(date);
          currentWeek = monday;
          await updateWeekDisplay();
          document.getElementById('calendarDropdown').classList.remove('show');
        });
        
        // Подсветка текущей недели при наведении
        dateEl.addEventListener('mouseenter', () => {
          clearWeekHighlight();
          highlightWeek(date);
        });
        
        grid.appendChild(dateEl);
      }
    }
  
    function clearWeekHighlight() {
      document.querySelectorAll('.calendar-date').forEach(el => {
        el.classList.remove('in-week', 'week-start', 'week-end');
      });
    }
  
    function highlightWeek(date) {
      const monday = getMonday(date);
      const dates = document.querySelectorAll('.calendar-date');
      
      dates.forEach(dateEl => {
        const dateValue = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), parseInt(dateEl.textContent));
        if (dateEl.classList.contains('other-month')) {
          if (parseInt(dateEl.textContent) > 15) {
            dateValue.setMonth(dateValue.getMonth() - 1);
          } else {
            dateValue.setMonth(dateValue.getMonth() + 1);
          }
        }
        
        const diffDays = Math.floor((dateValue - monday) / (1000 * 60 * 60 * 24));
        
        if (diffDays >= 0 && diffDays < 7) {
          dateEl.classList.add('in-week');
          if (diffDays === 0) dateEl.classList.add('week-start');
          if (diffDays === 6) dateEl.classList.add('week-end');
        }
      });
    }
  
    // Навигация по календарю
    document.getElementById('prevMonth').addEventListener('click', () => {
      calendarDate.setMonth(calendarDate.getMonth() - 1);
      generateCalendar();
    });
  
    document.getElementById('nextMonth').addEventListener('click', () => {
      calendarDate.setMonth(calendarDate.getMonth() + 1);
      generateCalendar();
    });
  
    // Показать/скрыть календарь
    document.getElementById('weekDisplay').addEventListener('click', () => {
      const dropdown = document.getElementById('calendarDropdown');
      dropdown.classList.toggle('show');
      if (dropdown.classList.contains('show')) {
        generateCalendar();
      }
    });
  
    // Закрытие календаря при клике вне его
    document.addEventListener('click', (e) => {
      const weekSelector = document.querySelector('.week-selector');
      const dropdown = document.getElementById('calendarDropdown');
      
      if (!weekSelector.contains(e.target)) {
        dropdown.classList.remove('show');
      }
    });
  
    // Очистка подсветки при уходе мыши с календаря
    document.getElementById('calendarGrid').addEventListener('mouseleave', () => {
      clearWeekHighlight();
    });
  
    // Инициализация при загрузке страницы
    async function init() {
      await updateWeekDisplay();
      generateCalendar();
    }
  
    // Запуск приложения
    init();

    function openClassModal(classId) {
      const classData = findClassById(classId);
      if (!classData) return;
  
      // Создаем модальное окно, если его еще нет
      if (!document.getElementById('classModal')) {
        createModalHTML();
      }
  
      // Заполняем модальное окно данными
      populateModal(classData);
      
      // Показываем модальное окно
      document.getElementById('classModal').style.display = 'flex';
      document.body.style.overflow = 'hidden !important'; // Блокируем прокрутку страницы
    }
  
    function closeClassModal() {
      document.getElementById('classModal').style.display = 'none';
      document.body.style.overflow = 'auto !important'; // Восстанавливаем прокрутку страницы
    }
  
    function findClassById(classId) {
      // Ищем занятие по ID во всех данных расписания
      for (const dateKey in currentScheduleData) {
        const dayClasses = currentScheduleData[dateKey];
        const foundClass = dayClasses.find(c => c.id === classId);
        if (foundClass) {
          return { ...foundClass, date: dateKey };
        }
      }
      return null;
    }
  
    function createModalHTML() {
      const modalHTML = `
        <div id="classModal" class="modal-overlay" onclick="closeClassModal()">
          <div class="modal-content" onclick="event.stopPropagation()">
            <div class="modal-header-top-div">
              <div class="modal-header">
                <h2 id="modalTitle" class="modal-class-title"></h2>
              </div>

              <div class="modal-head-r">
                <div class="modal-time-badge">
                    <span id="modalTime"></span>
                </div>
                <div class="modal-type-badge">
                  <span id="modalType"></span>
                </div>
                
                <div class="modal-info-section">
                  <div class="modal-info-row">
                    <span class="modal-info-label">МЕСТО ПРОВЕДЕНИЯ:</span>
                    <span id="modalLocation" class="modal-info-value"></span>
                  </div>
                  <div class="modal-info-row">
                    <span class="modal-info-label">НАПРАВЛЕНИЕ:</span>
                    <span id="modalDirection" class="modal-info-value"></span>
                  </div>
                  <div class="modal-info-row">
                    <span class="modal-info-label">ДЛЯ КОГО:</span>
                    <span id="modalLevel" class="modal-info-value"></span>
                  </div>
                </div>
              </div>
            </div>

            <div class="modal-master-section">
              <div class="master-photo-div">
                <img src="./src/images/Алхим.png" alt="" class="master-photo">
              </div>
              <div class="modal-master-name master-name" id="modalMasterName"></div>
            </div>
  
            <div class="modal-tabs">
              <button class="modal-tab active" onclick="switchModalTab(this, 'description')">Описание занятия</button>
              <button class="modal-tab" onclick="switchModalTab(this, 'master')">О мастере</button>
              <button class="modal-tab" onclick="switchModalTab(this, 'video')">Видео</button>
            </div>
  
            <div class="modal-tab-content">
              <div id="tabDescription" class="modal-tab-panel active">
                <p id="modalDescription" style="white-space: break-spaces !important;">Описание</p>
              </div>
              <div id="tabMaster" class="modal-tab-panel">
                <p style="white-space: break-spaces !important;" >Информация о мастере будет здесь...</p>
              </div>
              <div id="tabVideo" class="modal-tab-panel">
                <p>Видео материалы будут здесь...</p>
              </div>
            </div>
  
            <button class="btn more" onclick="closeClassModal()">Закрыть</button>
          </div>
        </div>
      `;
  
      document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
  
    function populateModal(classData) {
      // Заполняем основную информацию
      document.getElementById('modalTitle').textContent = classData.title;
      document.getElementById('modalTime').textContent = classData.time;
      document.getElementById('modalType').textContent = 'Регулярные занятия';
      document.getElementById('modalLocation').textContent = classData.room;
      document.getElementById('modalMasterName').textContent = classData.masterName;
  
      // Переводим направления на русский
      const directionsRu = {
        'qigong': 'Цигун',
        'yoga': 'Йога',
        'capoeira': 'Капоэйра',
        'dance': 'Танцы',
        'taichi': 'Тайцзи-цюань',
        'meditation': 'Медитация'
      };
  
      // Переводим уровни на русский
      const levelsRu = {
        'beginner': 'Для начинающих',
        'intermediate': 'Средний уровень', 
        'advanced': 'Продвинутый уровень',
        'kids': 'Для детей'
      };
  
      document.getElementById('modalDirection').textContent = directionsRu[classData.direction] || classData.direction;
      document.getElementById('modalLevel').textContent = levelsRu[classData.class] || classData.class;
    }
  
    function switchModalTab(tabButton, tabName) {
      // Убираем активный класс со всех табов
      document.querySelectorAll('.modal-tab').forEach(tab => tab.classList.remove('active'));
      document.querySelectorAll('.modal-tab-panel').forEach(panel => panel.classList.remove('active'));
  
      // Активируем выбранный таб
      tabButton.classList.add('active');
      document.getElementById(`tab${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`).classList.add('active');
    }
  
    // Закрытие модального окна по клавише Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeClassModal();
      }
    });
  