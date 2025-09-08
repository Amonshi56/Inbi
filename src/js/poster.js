const courses = [
    {
      id: 1,
      title: "Курс «Искусство развития мозга. Интегральные практики»",
      description: "Описание курса для развития мозга и интегральных практик... Изучение современных методов развития когнитивных способностей и интегральных практик для гармоничного развития личности.",
      startDate: "2025-12-28",
      endDate: "2026-01-17",
      format: "online",
      city: "Москва",
      instructor: "Иванов Иван",
      price: "10000"
    },
    {
      id: 2,
      title: "Курс «Медитативные практики и осознанность»",
      description: "Углубленное изучение медитативных техник и развитие осознанности в повседневной жизни. Практические занятия и теоретические основы.",
      startDate: "2025-01-15",
      endDate: "2025-02-28",
      format: "offline",
      city: "Санкт-Петербург",
      instructor: "Петрова Анна",
      price: "15000"
    },
    {
      id: 3,
      title: "Курс «Энергетические практики и биополе»",
      description: "Изучение энергетической структуры человека, работа с чакрами и биополем. Практические техники и диагностика.",
      startDate: "2025-02-01",
      endDate: "2025-03-15",
      format: "online",
      city: "Екатеринбург",
      instructor: "Сидоров Петр",
      price: "12000"
    },
    {
      id: 4,
      title: "Курс «Кристаллотерапия и литотерапия»",
      description: "Работа с кристаллами и камнями в терапевтических целях. История, методы применения и практические навыки.",
      startDate: "2025-02-10",
      endDate: "2025-03-25",
      format: "offline",
      city: "Новосибирск",
      instructor: "Кузнецова Мария",
      price: "18000"
    },
    {
      id: 5,
      title: "Курс «Ароматерапия и фитотерапия»",
      description: "Использование эфирных масел и растительных препаратов для оздоровления и гармонизации состояния.",
      startDate: "2025-03-01",
      endDate: "2025-04-15",
      format: "online",
      city: "Казань",
      instructor: "Николаев Дмитрий",
      price: "14000"
    },
    {
      id: 6,
      title: "Курс «Мантры и звукотерапия»",
      description: "Изучение воздействия звука и мантр на сознание и тело человека. Практические занятия по вокализации.",
      startDate: "2025-03-15",
      endDate: "2025-05-01",
      format: "offline",
      city: "Ростов-на-Дону",
      instructor: "Волков Александр",
      price: "13000"
    },
    {
      id: 7,
      title: "Курс «Йога и асаны для начинающих»",
      description: "Основы хатха-йоги, изучение базовых асан и дыхательных техник. Адаптированная программа для новичков.",
      startDate: "2025-04-01",
      endDate: "2025-05-30",
      format: "online",
      city: "Краснодар",
      instructor: "Морозова Елена",
      price: "11000"
    },
    {
      id: 8,
      title: "Курс «Рейки первой ступени»",
      description: "Введение в систему рейки, изучение основных принципов и техник. Настройка на энергию и первые практики.",
      startDate: "2025-04-15",
      endDate: "2025-06-01",
      format: "offline",
      city: "Воронеж",
      instructor: "Зайцев Михаил",
      price: "16000"
    },
    {
      id: 9,
      title: "Курс «Таро и оракульские карты»",
      description: "Изучение символизма таро, методы гадания и интерпретации карт. Развитие интуитивных способностей.",
      startDate: "2025-05-01",
      endDate: "2025-06-15",
      format: "online",
      city: "Самара",
      instructor: "Орлова Ольга",
      price: "9000"
    },
    {
      id: 10,
      title: "Курс «Нумерология и астрология»",
      description: "Основы нумерологического анализа и астрологических расчетов. Составление личных карт и прогнозов.",
      startDate: "2025-05-15",
      endDate: "2025-07-01",
      format: "offline",
      city: "Челябинск",
      instructor: "Соколов Владимир",
      price: "17000"
    }
  ];

  let currentPage = 1;
  const itemsPerPage = 6;
  let filteredCourses = [];
  let filters = {
    dateRange: null,
    format: 'all',
    city: 'all',
    instructor: 'all'
  };

  // Initialize
  document.addEventListener('DOMContentLoaded', function() {
    // Sort courses by date initially
    courses.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    
    initializeDatePicker();
    initializeDropdowns();
    initializeEventListeners();
    renderCourses();
    applyFilters();
  });

  function initializeDatePicker() {
    // Check if Russian locale is available, fallback to English
    const locale = window.flatpickr && window.flatpickr.l10ns && window.flatpickr.l10ns.ru 
      ? window.flatpickr.l10ns.ru 
      : "default";
      
    flatpickr("#dateRange", {
      mode: "range",
      dateFormat: "d.m.Y",
      locale: locale,
      placeholder: "Выберите период",
      onChange: function(selectedDates) {
        if (selectedDates.length === 2) {
          filters.dateRange = {
            start: selectedDates[0],
            end: selectedDates[1]
          };
        } else {
          filters.dateRange = null;
        }
        applyFilters();
      }
    });
  }

  function initializeDropdowns() {
    // Get unique cities and instructors
    const cities = [...new Set(courses.map(course => course.city))];
    const instructors = [...new Set(courses.map(course => course.instructor))];

    // Populate city dropdown
    const cityMenu = document.getElementById('cityMenu');
    cities.forEach(city => {
      const li = document.createElement('li');
      li.innerHTML = `<a class="dropdown-item" href="#" data-city="${city}">${city}</a>`;
      cityMenu.appendChild(li);
    });

    // Populate instructor dropdown
    const instructorMenu = document.getElementById('instructorMenu');
    instructors.forEach(instructor => {
      const li = document.createElement('li');
      li.innerHTML = `<a class="dropdown-item" href="#" data-instructor="${instructor}">${instructor}</a>`;
      instructorMenu.appendChild(li);
    });
  }

  function initializeEventListeners() {
    // Format filter buttons
    document.querySelectorAll('[data-format]').forEach(button => {
      button.addEventListener('click', function() {
        document.querySelectorAll('[data-format]').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        filters.format = this.dataset.format;
        applyFilters();
      });
    });

    // City dropdown
    document.getElementById('cityMenu').addEventListener('click', function(e) {
      if (e.target.dataset.city) {
        e.preventDefault();
        filters.city = e.target.dataset.city;
        document.getElementById('cityDropdown').textContent = e.target.textContent;
        applyFilters();
      }
    });

    // Instructor dropdown
    document.getElementById('instructorMenu').addEventListener('click', function(e) {
      if (e.target.dataset.instructor) {
        e.preventDefault();
        filters.instructor = e.target.dataset.instructor;
        document.getElementById('instructorDropdown').textContent = e.target.textContent;
        applyFilters();
      }
    });

    // Reset filters button
    document.getElementById('resetFilters').addEventListener('click', function() {
      resetAllFilters();
    });
  }

  function resetAllFilters() {
    // Reset all filter values
    filters = {
      dateRange: null,
      format: 'all',
      city: 'all',
      instructor: 'all'
    };

    // Reset UI elements
    // Date picker
    const dateInput = document.getElementById('dateRange');
    if (dateInput._flatpickr) {
      dateInput._flatpickr.clear();
    }
    
    // Format buttons
    document.querySelectorAll('[data-format]').forEach(btn => btn.classList.remove('active'));
    document.querySelector('[data-format="all"]').classList.add('active');
    
    // City dropdown
    document.getElementById('cityDropdown').textContent = 'Все города';
    
    // Instructor dropdown
    document.getElementById('instructorDropdown').textContent = 'Все ведущие';

    // Apply filters (will show all courses sorted by date)
    applyFilters();
  }

  function applyFilters() {
    // Always start with courses sorted by date
    let coursesToFilter = [...courses].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

    filteredCourses = coursesToFilter.filter(course => {
      // Date range filter
      if (filters.dateRange) {
        const courseStart = new Date(course.startDate);
        const courseEnd = new Date(course.endDate);
        const filterStart = filters.dateRange.start;
        const filterEnd = filters.dateRange.end;
        
        if (courseEnd < filterStart || courseStart > filterEnd) {
          return false;
        }
      }

      // Format filter
      if (filters.format !== 'all' && course.format !== filters.format) {
        return false;
      }

      // City filter
      if (filters.city !== 'all' && course.city !== filters.city) {
        return false;
      }

      // Instructor filter
      if (filters.instructor !== 'all' && course.instructor !== filters.instructor) {
        return false;
      }

      return true;
    });

    currentPage = 1;
    renderCourses();
  }

  function renderCourses() {
    const container = document.getElementById('cardsContainer');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const coursesToShow = filteredCourses.slice(startIndex, endIndex);

    if (coursesToShow.length === 0) {
      container.innerHTML = `
        <div class="no-results col-12">
          <h4>Курсы не найдены</h4>
          <p>По заданным критериям курсы не найдены. Попробуйте изменить фильтры.</p>
        </div>
      `;
    } else {
      container.innerHTML = coursesToShow.map(course => createCourseCard(course)).join('');
    }

    renderPagination();
    updateResultsInfo();
  }

  function createCourseCard(course) {
    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    const formatBadge = course.format === 'online' ? 'online' : 'offline';
    const formatText = course.format === 'online' ? 'ОНЛАЙН' : 'ОФЛАЙН';

    return `
      <div class="card pr-card h-100 shadow-sm border-0">
        <p class="text-data">${formatDate(course.startDate)} - ${formatDate(course.endDate)}</p>
        <h5 class="card-title">${course.title}</h5>
        <p class="pr-card-text">${course.description}</p>
        
        <div class="d-flex flex-wrap align-items-start align-content-start gap-2">
          <span class="badge ${formatBadge}">${formatText}</span>
          <span class="badge btninfo">${course.city}</span>
          <span class="badge btninfo">ВЕДУЩИЙ: ${course.instructor}</span>
        </div>
        
        <div class="d-flex justify-content-between align-items-center">
          <span class="price">ЦЕНА: <strong class="sum">от ${parseInt(course.price).toLocaleString('ru-RU')} руб.</strong></span>
        </div>
        
        <div class="d-flex flex-column justify-content-center align-items-end gap-3 align-self-end">
          <button class="btn more">Подробнее</button>
        </div>
      </div>
    `;
  }

  function renderPagination() {
    const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
    const pagination = document.getElementById('pagination');

    if (totalPages <= 1) {
      pagination.innerHTML = '';
      return;
    }

    let paginationHTML = '';

    // Previous button
    if (currentPage > 1) {
      paginationHTML += `
        <li class="page-item">
          <a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Предыдущая</a>
        </li>
      `;
    }

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
        paginationHTML += `
          <li class="page-item ${i === currentPage ? 'active' : ''}">
            <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
          </li>
        `;
      } else if (i === currentPage - 3 || i === currentPage + 3) {
        paginationHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
      }
    }

    // Next button
    if (currentPage < totalPages) {
      paginationHTML += `
        <li class="page-item">
          <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Следующая</a>
        </li>
      `;
    }

    pagination.innerHTML = paginationHTML;
  }

  function updateResultsInfo() {
    const resultsInfo = document.getElementById('resultsInfo');
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, filteredCourses.length);
    
    resultsInfo.textContent = `Показано ${startIndex}-${endIndex} из ${filteredCourses.length} курсов`;
  }

  function changePage(page) {
    currentPage = page;
    renderCourses();
    
    // Scroll to top of cards
    document.getElementById('cardsContainer').scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }