// Функция для обновления температуры
/*function updateTemperature() {
    console.log("Обновляем температуру...");
    const tempElement = document.getElementById('temperature');
    // Генерируем случайную температуру от 20.0 до 24.0
    const randomTemp = (20 + Math.random() * 4).toFixed(1);
    tempElement.textContent = randomTemp + '°C';
    console.log("Температура обновлена: " + randomTemp);
}*/

// Функция для управления светом
function setupLightButtons() {
    console.log("Настраиваем кнопки света...");
    
    // Находим все кнопки с классом 'light-btn'
    const lightButtons = document.querySelectorAll('.light-btn');
    console.log("Найдено кнопок: " + lightButtons.length);
    
    // Для каждой кнопки добавляем обработчик клика
    lightButtons.forEach((button, index) => {
        console.log("Настраиваем кнопку " + index);
        
        // Устанавливаем начальное состояние на основе текста кнопки
        if (button.textContent === 'ВКЛ') {
            button.classList.add('on');
            button.classList.remove('off');
        } else {
            button.classList.add('off');
            button.classList.remove('on');
        }
        
        // Обработчик клика
        button.addEventListener('click', function() {
            console.log("Кнопка нажата! Текст: " + this.textContent);
            
            // Переключаем состояние
            if (this.classList.contains('on')) {
                // Если был ВКЛ - меняем на ВЫКЛ
                this.classList.remove('on');
                this.classList.add('off');
                this.textContent = 'ВЫКЛ';
                console.log("Свет выключен");
            } else {
                // Если был ВЫКЛ - меняем на ВКЛ
                this.classList.remove('off');
                this.classList.add('on');
                this.textContent = 'ВКЛ';
                console.log("Свет включен");
            }
        });
    });
}

// Функция для симуляции системы безопасности
function simulateSecurity() {
    console.log("Проверка безопасности...");
    const statusElement = document.getElementById('security-status');
    
    // С вероятностью 90% - всё нормально, 10% - тревога
    if (Math.random() > 0.1) {
        statusElement.textContent = 'Все датчики в норме';
        statusElement.className = 'security-normal';
    } else {
        statusElement.textContent = 'ТРЕВОГА! Обнаружено движение!';
        statusElement.className = 'security-alarm';
        
        // Через 3 секунды возвращаем нормальный статус
        setTimeout(() => {
            statusElement.textContent = 'Все датчики в норме';
            statusElement.className = 'security-normal';
        }, 3000);
    }
}

// Запускаем всё когда страница загрузится
document.addEventListener('DOMContentLoaded', function() {
    console.log("Страница загружена! Запускаем скрипты...");
    
    // Обновляем температуру сразу и каждые 5 секунд
    updateTemperature();
    setInterval(updateTemperature, 5000);
    
    // Настраиваем кнопки света
    setupLightButtons();
    
    // Симулируем систему безопасности каждые 10 секунд
    setInterval(simulateSecurity, 10000);
    
    console.log("Все функции запущены!");
});