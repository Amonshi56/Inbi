class InbiNavbar extends HTMLElement {
    constructor() {
        super();
        this.isMenuOpen = false;
        this.eventHandlers = new Map(); // Для отслеживания обработчиков
        this.animationTimeout = null; // Для контроля анимаций
    }

    connectedCallback() {
        this.render();
        this.initMobileMenu();
        this.initScrollBehavior();
    }

    disconnectedCallback() {
        this.cleanup();
    }

    cleanup() {
        // Очищаем все обработчики событий
        this.eventHandlers.forEach((handler, element) => {
            element.removeEventListener(handler.event, handler.callback);
        });
        this.eventHandlers.clear();
        
        // Очищаем таймауты
        if (this.animationTimeout) {
            clearTimeout(this.animationTimeout);
        }
    }

    addEventHandler(element, event, callback) {
        // Удаляем предыдущий обработчик если есть
        const key = `${element}_${event}`;
        if (this.eventHandlers.has(key)) {
            const oldHandler = this.eventHandlers.get(key);
            element.removeEventListener(event, oldHandler.callback);
        }
        
        // Добавляем новый
        element.addEventListener(event, callback);
        this.eventHandlers.set(key, { event, callback });
    }

    render() {
        this.innerHTML = `
            <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top py-3" style="height: 128px;padding: 12px 120px;">
                <div class="container-fluid" style="height: 56px;display: flex;justify-content: space-between;align-items: flex-start;align-content: flex-start;row-gap: 16px;flex: 1 0 0;flex-wrap: wrap;align-items: center;">
                    <div class="col-4">
                        <a class="navbar-brand" href="./index.html" style="display: flex; height: 56px;padding: 0 0.198px;justify-content: center;align-items: center;">
                        <img src="./src/icons/inbib.svg" alt="ИНБИ" height="56"></a>
                    </div>
                    
                    <button class="navbar-toggler" type="button" id="navbarToggler">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                 
                    <div class="col-8" style="display: flex;">
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav ms-auto">
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" role="button" id="aboutDropdown">
                                        О нас 
                                        <svg class="nav-toggle-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="margin-left:4px">
                                            <g clip-path="url(#clip0_1090_1634)">
                                                <path d="M17.2929 8.29289C17.6834 7.90237 18.3164 7.90237 18.707 8.29289C19.0975 8.68342 19.0975 9.31643 18.707 9.70696L12.707 15.707C12.3164 16.0975 11.6834 16.0975 11.2929 15.707L5.29289 9.70696C4.90237 9.31643 4.90237 8.68342 5.29289 8.29289C5.68342 7.90237 6.31643 7.90237 6.70696 8.29289L11.9999 13.5859L17.2929 8.29289Z"/>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1090_1634">
                                                    <rect width="24" height="24" fill="white"/>
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </a>
                                    <ul class="dropdown-menu custom-dropdown">
                                        <li><a class="dropdown-item" href="about_us.html" id="about_us_btn">О клубе ИНБИ</a></li>
                                        <li><a class="dropdown-item" href="#masters">Мастера</a></li>
                                        <li><a class="dropdown-item" href="#founder">Основатель</a></li>
                                        <li><a class="dropdown-item" href="./reviews.html" id="reviews_btn">Отзывы</a></li>
                                        <li><a class="dropdown-item" href="#gallery">Фотогалерея</a></li>
                                        <li><a class="dropdown-item" href="./FAQ.html" id="FAQ_btn">FAQ</a></li>
                                    </ul>
                                </li>
                                <li class="nav-item"><a class="nav-link" href="#practices">Практики</a></li>
                                <li class="nav-item"><a class="nav-link" href="#events">События</a></li>
                                <li class="nav-item"><a class="nav-link" href="#schedule">Расписание</a></li>
                                <li class="nav-item"><a class="nav-link" href="./prices.html" id="pricing">Цены</a></li>
                                <li class="nav-item"><a class="nav-link" href="#rental">Аренда залов</a></li>
                                <li class="nav-item"><a class="nav-link" href="#contact">Контакты</a></li>
                                <li class="nav-item"><a class="nav-link" href="#cabinet">Личный кабинет</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        `;
    }

    initMobileMenu() {
        // Очищаем предыдущие обработчики
        this.cleanup();
        
        const navbarToggler = this.querySelector('.navbar-toggler');
        const navbarCollapse = this.querySelector('#navbarNav');
        const body = document.body;

        const initMobileMenuLogic = () => {
            if (window.innerWidth <= 1500) {
                this.setupMobileMode(navbarToggler, navbarCollapse, body);
            } else {
                this.setupDesktopMode(navbarToggler, navbarCollapse, body);
            }
        };

        initMobileMenuLogic();
        
        // Добавляем обработчик resize с дебаунсом
        let resizeTimeout;
        const debouncedResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(initMobileMenuLogic, 150);
        };
        
        this.addEventHandler(window, 'resize', debouncedResize);
    }

    setupMobileMode(navbarToggler, navbarCollapse, body) {
        // Убираем Bootstrap атрибуты
        navbarToggler.removeAttribute('data-bs-toggle');
        navbarToggler.removeAttribute('data-bs-target');
        
        const dropdownToggles = this.querySelectorAll('.nav-link.dropdown-toggle');
        dropdownToggles.forEach(toggle => {
            toggle.removeAttribute('data-bs-toggle');
        });
        
        // Сбрасываем состояние
        this.isMenuOpen = false;
        this.closeMenu();

        // Обработчик для кнопки меню
        this.addEventHandler(navbarToggler, 'click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            this.isMenuOpen = !this.isMenuOpen;
            
            if (this.isMenuOpen) {
                this.openMenu();
            } else {
                this.closeMenu();
            }
        });

        // Обработчики для dropdown
        dropdownToggles.forEach(toggle => {
            this.addEventHandler(toggle, 'click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const dropdownMenu = toggle.nextElementSibling;
                const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

                // Закрываем другие dropdown
                dropdownToggles.forEach(otherToggle => {
                    if (otherToggle !== toggle) {
                        const otherMenu = otherToggle.nextElementSibling;
                        otherMenu.classList.remove('show');
                        otherToggle.setAttribute('aria-expanded', 'false');
                    }
                });

                // Переключаем текущий dropdown
                if (isExpanded) {
                    dropdownMenu.classList.remove('show');
                    toggle.setAttribute('aria-expanded', 'false');
                } else {
                    dropdownMenu.classList.add('show');
                    toggle.setAttribute('aria-expanded', 'true');
                }
            });
        });

        // Закрытие меню при клике на ссылки
        const navLinks = this.querySelectorAll('.navbar-nav .nav-link:not(.dropdown-toggle)');
        navLinks.forEach(link => {
            this.addEventHandler(link, 'click', () => {
                this.isMenuOpen = false;
                this.closeMenu();
            });
        });

        const dropdownItems = this.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            this.addEventHandler(item, 'click', () => {
                this.isMenuOpen = false;
                this.closeMenu();
            });
        });

        // Закрытие по Escape
        this.addEventHandler(document, 'keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.isMenuOpen = false;
                this.closeMenu();
            }
        });

        // Закрытие при клике вне меню
        this.addEventHandler(navbarCollapse, 'click', (e) => {
            if (e.target === navbarCollapse) {
                this.isMenuOpen = false;
                this.closeMenu();
            }
        });
    }

    setupDesktopMode(navbarToggler, navbarCollapse, body) {
        // Восстанавливаем Bootstrap атрибуты
        navbarToggler.setAttribute('data-bs-toggle', 'collapse');
        navbarToggler.setAttribute('data-bs-target', '#navbarNav');
        
        const dropdownToggles = this.querySelectorAll('.nav-link.dropdown-toggle');
        dropdownToggles.forEach(toggle => {
            toggle.setAttribute('data-bs-toggle', 'dropdown');
        });
        
        // Сбрасываем мобильные стили
        navbarCollapse.style.display = '';
        navbarCollapse.style.opacity = '';
        navbarCollapse.style.transform = '';
        navbarCollapse.classList.remove('show');
        body.classList.remove('menu-open');
        
        this.isMenuOpen = false;
    }

    openMenu() {
        if (this.animationTimeout) {
            clearTimeout(this.animationTimeout);
        }

        const navbarCollapse = this.querySelector('#navbarNav');
        const navbarToggler = this.querySelector('.navbar-toggler');
        const body = document.body;
        
        navbarCollapse.style.display = 'flex';
        navbarCollapse.classList.add('show');
        navbarToggler.setAttribute('aria-expanded', 'true');
        body.classList.add('menu-open');
        
        // Используем requestAnimationFrame для плавной анимации
        requestAnimationFrame(() => {
            navbarCollapse.style.opacity = '1';
            navbarCollapse.style.transform = 'translateY(0)';
        });
    }

    closeMenu() {
        if (this.animationTimeout) {
            clearTimeout(this.animationTimeout);
        }

        const navbarCollapse = this.querySelector('#navbarNav');
        const navbarToggler = this.querySelector('.navbar-toggler');
        const body = document.body;
        
        navbarCollapse.style.opacity = '0';
        navbarCollapse.style.transform = 'translateY(-20px)';
        navbarToggler.setAttribute('aria-expanded', 'false');
        body.classList.remove('menu-open');
        
        // Закрываем все dropdown
        const openDropdowns = this.querySelectorAll('.dropdown-menu.show');
        openDropdowns.forEach(dropdown => {
            dropdown.classList.remove('show');
            const dropdownToggle = dropdown.previousElementSibling;
            if (dropdownToggle) {
                dropdownToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        this.animationTimeout = setTimeout(() => {
            navbarCollapse.classList.remove('show');
            navbarCollapse.style.display = 'none';
            this.animationTimeout = null;
        }, 300);
    }

    initScrollBehavior() {
        const navbar = this.querySelector('.navbar');
        
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    if (window.scrollY > 50) {
                        navbar.classList.add('scrolled');
                    } else {
                        navbar.classList.remove('scrolled');
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        this.addEventHandler(window, 'scroll', handleScroll);
    }
}

customElements.define('inbi-navbar', InbiNavbar);

