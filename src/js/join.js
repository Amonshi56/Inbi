        // Глобальные переменные
        const form = document.getElementById('membershipForm');
        const cardOptions = document.querySelectorAll('.card-option');
        const cardTypeInput = document.getElementById('cardType');

        // Валидация полей в реальном времени
        const validators = {
            email: (value) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            },
            phone: (value) => {
                const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
                return phoneRegex.test(value);
            },
            telegram: (value) => {
                if (!value) return true; // необязательное поле
                const telegramRegex = /^[a-zA-Z0-9_]+$/;
                return telegramRegex.test(value);
            },
            fullName: (value) => {
                const latinRegex = /^[a-zA-Z\s]+$/;
                return latinRegex.test(value);
            }
        };

        // Функция валидации поля
        function validateField(field) {
            const value = field.value.trim();
            const fieldName = field.name;
            const errorMessage = field.parentNode.querySelector('.error-message');
            let isValid = true;
            let message = '';

            // Проверка обязательных полей
            if (field.hasAttribute('required') && !value) {
                isValid = false;
                message = 'Это поле обязательно для заполнения';
            }
            // Специальная валидация
            else if (value && validators[fieldName] && !validators[fieldName](value)) {
                isValid = false;
                switch (fieldName) {
                    case 'email':
                        message = 'Введите корректный email адрес';
                        break;
                    case 'phone':
                        message = 'Введите корректный номер телефона';
                        break;
                    case 'telegram':
                        message = 'Ник должен содержать только буквы, цифры и знак _';
                        break;
                    case 'fullName':
                        message = 'Используйте только латинские буквы';
                        break;
                }
            }

            // Обновление UI
            field.classList.remove('error', 'valid');
            if (errorMessage) {
                errorMessage.textContent = message;
                errorMessage.classList.toggle('show', !isValid);
            }

            if (value) {
                field.classList.add(isValid ? 'valid' : 'error');
            }

            return isValid;
        }

        // Добавление обработчиков валидации
        form.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('blur', () => validateField(field));
            field.addEventListener('input', () => {
                if (field.classList.contains('error')) {
                    validateField(field);
                }
            });
        });



        // Обработка чекбоксов
        form.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const errorMessage = checkbox.closest('.checkbox-item').querySelector('.error-message');
                if (errorMessage && checkbox.checked) {
                    errorMessage.classList.remove('show');
                }
            });
        });

        // Обработка отправки формы
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isFormValid = true;

            // Валидация всех полей
            form.querySelectorAll('input[required], textarea[required]').forEach(field => {
                if (!validateField(field)) {
                    isFormValid = false;
                }
            });


            // Проверка чекбоксов
            form.querySelectorAll('input[type="checkbox"][required]').forEach(checkbox => {
                if (!checkbox.checked) {
                    isFormValid = false;
                    const errorMessage = checkbox.closest('.checkbox-item').querySelector('.error-message');
                    if (errorMessage) {
                        errorMessage.classList.add('show');
                    }
                }
            });

            if (isFormValid) {
                // Имитация отправки
                const submitBtn = document.getElementById('submitBtn');
                const successMessage = document.getElementById('successMessage');
                
                submitBtn.textContent = 'Отправляется...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    form.style.display = 'none';
                    successMessage.style.display = 'block';
                }, 1500);
            } else {
                // Прокрутка к первой ошибке
                const firstError = form.querySelector('.error, .error-message.show');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });

        // Кнопка отмены
        document.getElementById('cancelBtn').addEventListener('click', () => {
            if (confirm('Вы уверены, что хотите отменить заполнение формы? Все введенные данные будут потеряны.')) {
                form.reset();
                cardOptions.forEach(opt => opt.classList.remove('selected'));
                form.querySelectorAll('.error, .valid').forEach(el => {
                    el.classList.remove('error', 'valid');
                });
                form.querySelectorAll('.error-message.show').forEach(el => {
                    el.classList.remove('show');
                });
            }
        });