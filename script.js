// Глобальные переменные
let currentTemp = 24.7; // начальная температура
let targetTemp = 24.7;
let tempInterval = null;

// Обновление отображения текущей температуры
function displayCurrentTemp() {
    document.getElementById('temperature').textContent = currentTemp.toFixed(1) + '°C';
}

// Постепенное изменение температуры к цели
function startTemperatureAdjustment() {
    // Останавливаем предыдущий интервал, если есть
    if (tempInterval) clearInterval(tempInterval);

    // Если уже достигли цели — ничего не делаем
    if (Math.abs(currentTemp - targetTemp) < 0.05) {
        currentTemp = targetTemp;
        displayCurrentTemp();
        return;
    }

    // Запускаем постепенное изменение
    tempInterval = setInterval(() => {
        const diff = targetTemp - currentTemp;
        if (Math.abs(diff) < 0.05) {
            // Достигли цели
            currentTemp = targetTemp;
            displayCurrentTemp();
            clearInterval(tempInterval);
            tempInterval = null;
        } else {
            // Меняем на 0.1°C за шаг (можно регулировать скорость)
            currentTemp += diff > 0 ? 0.1 : -0.1;
            displayCurrentTemp();
        }
    }, 500); // каждые 500 мс
}

// Настройка климат-контроля
function setupClimateControl() {
    const slider = document.getElementById('target-temp');
    const valueDisplay = document.getElementById('target-temp-value');
    const button = document.getElementById('set-temp-btn');

    // Синхронизируем ползок и отображение
    slider.addEventListener('input', () => {
        valueDisplay.textContent = slider.value;
    });

    // Установка целевой температуры
    button.addEventListener('click', () => {
        targetTemp = parseFloat(slider.value);
        console.log("Целевая температура установлена:", targetTemp);
        startTemperatureAdjustment();
    });
}

// Функция для управления светом
function setupLightButtons() {
    const lightButtons = document.querySelectorAll('.light-btn');
    lightButtons.forEach(button => {
        if (button.textContent === 'ВКЛ') {
            button.classList.add('on');
            button.classList.remove('off');
        } else {
            button.classList.add('off');
            button.classList.remove('on');
        }

        button.addEventListener('click', function() {
            if (this.classList.contains('on')) {
                this.classList.remove('on');
                this.classList.add('off');
                this.textContent = 'ВЫКЛ';
            } else {
                this.classList.remove('off');
                this.classList.add('on');
                this.textContent = 'ВКЛ';
            }
        });
    });
}

// Симуляция безопасности
function simulateSecurity() {
    const statusElement = document.getElementById('security-status');
    if (Math.random() > 0.1) {
        statusElement.textContent = 'Все датчики в норме';
        statusElement.className = 'security-normal';
    } else {
        statusElement.textContent = 'ТРЕВОГА! Обнаружено движение!';
        statusElement.className = 'security-alarm';
        setTimeout(() => {
            statusElement.textContent = 'Все датчики в норме';
            statusElement.className = 'security-normal';
        }, 3000);
    }
}

// Функция для обновления времени
function updateClock() {
    const now = new Date();
    
    // Форматируем время
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    // Форматируем дату
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const dateString = now.toLocaleDateString('ru-RU', options);
    
    // Обновляем элементы
    document.getElementById('digital-clock').textContent = `${hours}:${minutes}:${seconds}`;
    document.getElementById('current-date').textContent = dateString;
}

// Обновляем время в меню
function updateMenuTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('ru-RU', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    const timeElements = document.querySelectorAll('.menu-info .value');
    if (timeElements[2]) { // Третий элемент с классом value - это "Обновлено"
        timeElements[2].textContent = timeString;
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Устанавливаем начальную температуру
    displayCurrentTemp();

    // Настраиваем климат
    setupClimateControl();

    // Свет
    setupLightButtons();

    // Безопасность
    setInterval(simulateSecurity, 10000);

    // Часы - запускаем сразу и потом каждую секунду
    updateClock();
    updateMenuTime();
    setInterval(updateClock, 1000);
    setInterval(updateMenuTime, 60000);
});