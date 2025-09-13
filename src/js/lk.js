function switchTab(tabName) {
    // Скрываем все табы
    const allTabs = document.querySelectorAll('.tab-content');
    allTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Убираем активный класс у всех кнопок табов
    const allTabButtons = document.querySelectorAll('.tab');
    allTabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Показываем выбранный таб
    document.getElementById(tabName).classList.add('active');
    
    // Добавляем активный класс к нажатой кнопке
    event.target.classList.add('active');
}

function openModal() {
    const modal = document.getElementById('modalOverlay');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Предотвращаем прокрутку фона
}

function closeModal(event) {
    // Закрываем только при клике на overlay или кнопку закрытия
    if (event && event.target !== event.currentTarget && !event.target.classList.contains('close-btn') && !event.target.classList.contains('close-x')) {
        return;
    }
    
    const modal = document.getElementById('modalOverlay');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Возвращаем прокрутку
}

// Закрытие по клавише Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});