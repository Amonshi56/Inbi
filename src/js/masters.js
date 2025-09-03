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
 
  
  document.addEventListener("DOMContentLoaded", () => {
    const mastersGrid = document.getElementById("mastersGrid");
    const noResults = document.getElementById("noResults");
    const pagination = document.getElementById("pagination");

    let allMasters = [];
    let filteredMasters = [];
    let currentPage = 1;
    const itemsPerPageDesktop = 18;
    const itemsPerPageMobile = 10;

    // ---- Тестовые данные ----
    allMasters = [
      { first_name: "Иван", second_name: "Смирнов", city: "Москва", practices: ["Цигун"], photo: "./src/images/Алхим.png" },
      { first_name: "Анна", second_name: "Иванова", city: "Санкт-Петербург", practices: ["Багуа"], photo: "./src/images/Алхим.png" },
      { first_name: "Олег", second_name: "Кузнецов", city: "Москва", practices: ["Цигун","Багуа"], photo: "./src/images/Алхим.png" },
      { first_name: "Мария", second_name: "Петрова", city: "Новосибирск", practices: ["Йога"], photo: "./src/images/star.png" },
      { first_name: "Дмитрий", second_name: "Соколов", city: "Москва", practices: ["Айкидо"], photo: "./src/images/Алхим.png" },
      { first_name: "Елена", second_name: "Васильева", city: "Санкт-Петербург", practices: ["Йога","Цигун"], photo: "./src/images/Алхим.png" },
      { first_name: "Андрей", second_name: "Николаев", city: "Москва", practices: ["Багуа"], photo: "./src/images/Алхим.png" },
      { first_name: "Светлана", second_name: "Козлова", city: "Новосибирск", practices: ["Айкидо"], photo: "./src/images/Алхим.png" },
      { first_name: "Михаил", second_name: "Попов", city: "Москва", practices: ["Йога"], photo: "./src/images/Алхим.png" },
    ];

    filteredMasters = allMasters;

    // Собираем уникальные города и практики
    function buildFilters() {
      const cityFilters = document.getElementById("cityFilters");
      const practiceFilters = document.getElementById("practiceFilters");

      const cities = [...new Set(allMasters.map(m => m.city))];
      const practices = [...new Set(allMasters.flatMap(m => m.practices))];

      cities.forEach(city => {
        const div = document.createElement("div");
        div.className = "filter-checkbox-item";
        div.innerHTML = `
          <input type="checkbox" class="filter-checkbox" value="${city}" id="city_${city}">
          <label for="city_${city}">${city}</label>
        `;
        cityFilters.appendChild(div);
      });

      practices.forEach(p => {
        const div = document.createElement("div");
        div.className = "filter-checkbox-item";
        div.innerHTML = `
          <input type="checkbox" class="filter-checkbox" value="${p}" id="practice_${p}">
          <label for="practice_${p}">${p}</label>
        `;
        practiceFilters.appendChild(div);
      });

      document.querySelectorAll(".filter-checkbox").forEach(cb => {
        cb.addEventListener("change", applyFilters);
      });
    }

    function updateFilterCounters() {
      const cityChecked = document.querySelectorAll("#cityFilters input:checked").length;
      const practiceChecked = document.querySelectorAll("#practiceFilters input:checked").length;
    
      const cityCounter = document.getElementById("cityCounter");
      const practiceCounter = document.getElementById("practiceCounter");
    
      // Город
      if (cityChecked > 0) {
        cityCounter.textContent = cityChecked;
        cityCounter.style.display = "inline-block";
      } else {
        cityCounter.style.display = "none";
      }
    
      // Практика
      if (practiceChecked > 0) {
        practiceCounter.textContent = practiceChecked;
        practiceCounter.style.display = "inline-block";
      } else {
        practiceCounter.style.display = "none";
      }
    }
    

    // Фильтрация
    function applyFilters() {
      const selectedCities = [...document.querySelectorAll("#cityFilters input:checked")].map(cb => cb.value);
      const selectedPractices = [...document.querySelectorAll("#practiceFilters input:checked")].map(cb => cb.value);

      filteredMasters = allMasters.filter(master => {
        const cityMatch = selectedCities.length === 0 || selectedCities.includes(master.city);
        const practiceMatch = selectedPractices.length === 0 || master.practices.some(p => selectedPractices.includes(p));
        return cityMatch && practiceMatch;
      });

      updateFilterCounters(); 
      currentPage = 1;
      render();
    }

    // Рендер карточек
    function render() {
      mastersGrid.innerHTML = "";
      const isMobile = window.innerWidth < 768;
      const itemsPerPage = isMobile ? itemsPerPageMobile : itemsPerPageDesktop;

      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const pageItems = filteredMasters.slice(start, end);

      if (pageItems.length === 0) {
        noResults.classList.remove("hidden");
      } else {
        noResults.classList.add("hidden");
      }

      pageItems.forEach(master => {
        mastersGrid.innerHTML += `
          <div class="master-card-div">
            <div class="master-photo-div">
              <img src="${master.photo}" alt="" class="master-photo">
            </div>
            <div>
              <p class="master-name">${master.first_name}</p>
              <p class="master-name">${master.second_name}</p>
              <p style="display:none;"><b>Город:</b> ${master.city}</p>
              <div style="display:none;"><b>Практики:</b> ${master.practices.join(", ")}</div>
            </div>  
          </div>
        `;
      });

      renderPagination(itemsPerPage);
    }

    // Рендер пагинации
    function renderPagination(itemsPerPage) {
      pagination.innerHTML = "";
      const pageCount = Math.ceil(filteredMasters.length / itemsPerPage);
    
      if (pageCount <= 1) return;
    
      const maxVisible = 3; // сколько страниц вокруг текущей (суммарно = 2 слева + 2 справа)
    
      const pages = [];
      const half = Math.floor(maxVisible / 2);
    
      // Всегда первая страница
      pages.push(1);
    
      let start = Math.max(2, currentPage - half);
      let end = Math.min(pageCount - 1, currentPage + half);
    
      // Если текущая страница близко к началу — сдвигаем диапазон вправо
      if (currentPage <= half) {
        end = Math.min(pageCount - 1, maxVisible);
      }
    
      // Если текущая страница близко к концу — сдвигаем диапазон влево
      if (currentPage >= pageCount - half) {
        start = Math.max(2, pageCount - maxVisible + 1);
      }
    
      if (start > 2) {
        pages.push("...");
      }
    
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    
      if (end < pageCount - 1) {
        pages.push("...");
      }
    
      // Всегда последняя страница
      if (pageCount > 1) {
        pages.push(pageCount);
      }
    
      // Рисуем кнопки
      pages.forEach(p => {
        const btn = document.createElement("button");
    
        if (p === "...") {
          btn.innerText = "...";
          btn.disabled = true;
        } else {
          btn.innerText = p;
          btn.id = "pageNumbers";
          btn.className = p === currentPage ? "active" : "";
          btn.addEventListener("click", () => {
            currentPage = p;
            render();
          });
        }
    
        pagination.appendChild(btn);
      });
    }
    
    

    window.addEventListener("resize", render);

    buildFilters();
    render();
  });