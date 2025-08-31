
class InbiFooter extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.initEvents();
    }

    render() {
        this.innerHTML = `
            <footer class="footer-sector">
                <div class="footer-container">
                    <div class="contact-block">
                        <img src="./src/icons/inbiw.svg" alt="ИНБИ" class="label-contact" style="max-height: 60px;">
                        <p class="addres-text mobile-hidd" style="animation-delay: 0.2s;">Ⓒ 1987-2025</p>
                    </div>
                    
                    <div class="contact-block desktop-hidd">
                        <p class="addres-head">Вступить в клуб</p>
                        <button class="btn more reg">Заявка на вступление</button>
                    </div>
                   
                    <div class="contact-block">
                        <p class="addres-head">Контакты</p>
                        <address class="addres-text">
                            Адрес: м. Новослабодская / Менделеевская/<br>
                            Достоевская, пл. Борьбы, д. 13а. стр. 1. клуб ИНБИ<br>
                            Тел: +7 (495) 684-44-20<br>
                            Факс: 684-41-17<br>
                            Свяжитесь с нами: inbi@inbi.ru
                        </address>
                    </div>
                   
                    <div class="contact-block">
                        <p class="addres-head">Мы в соц. сетях</p>
                        <p class="addres-text">Свяжитесь с нами: inbi@inbi.ru</p>
                    </div>
                   
                    <div class="contact-block mobile-hidd">
                        <p class="addres-head">Вступить в клуб</p>
                        <button class="btn more reg">Заявка на вступление</button>
                    </div>
                    
                    <div class="desktop-hidd" style="justify-content: center;">
                        <p class="addres-text" style="animation-delay: 0.2s;">Ⓒ 1987-2025</p>
                    </div>
                </div>
            </footer>
        `;
    }

    initEvents() {
        // Обработчики для кнопок "Заявка на вступление"
        const regButtons = this.querySelectorAll('.btn.reg');
        regButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.handleRegistration();
            });
        });

        // Обработчик для email ссылок
        const emailLinks = this.querySelectorAll('address');
        emailLinks.forEach(address => {
            address.addEventListener('click', (e) => {
                if (e.target.textContent.includes('inbi@inbi.ru')) {
                    e.preventDefault();
                    window.location.href = 'mailto:inbi@inbi.ru';
                }
            });
        });

        this.initScrollAnimation();
    }

    handleRegistration() {
        const event = new CustomEvent('registration-request', {
            bubbles: true,
            detail: { source: 'footer' }
        });
        document.dispatchEvent(event);
        
        // зашлушка регистрации
        alert('Переход к форме регистрации');
    }

    initScrollAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.classList.add('footer-visible');
                    
                    // Анимация элементов с задержкой
                    const animatedElements = this.querySelectorAll('.addres-text[style*="animation-delay"]');
                    animatedElements.forEach((el, index) => {
                        setTimeout(() => {
                            el.style.opacity = '1';
                            el.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                }
            });
        }, { threshold: 0.1 });

        observer.observe(this);
    }
}

// Регистрируем компонент
customElements.define('inbi-footer', InbiFooter);


// Глобальный обработчик события регистрации
// document.addEventListener('registration-request', (e) => {
//     console.log('Запрос на регистрацию из:', e.detail.source);

// });