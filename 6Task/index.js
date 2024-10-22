document.addEventListener('DOMContentLoaded', function() {
    const quantityInput = document.getElementById('quantity');
    const productSelect = document.getElementById('product');
    const optionsContainer = document.getElementById('options-container');
    const checkboxContainer = document.getElementById('checkbox-container');
    const errorMessage = document.getElementById('error-message');

    // Функция для обновления видимости элементов в зависимости от типа товара
    function updateVisibility() {
        const selectedType = document.querySelector('input[name="productType"]:checked').value;
        if (selectedType === '1') {
            optionsContainer.style.display = 'none';
            checkboxContainer.style.display = 'none';
        } else if (selectedType === '2') {
            optionsContainer.style.display = 'block';
            checkboxContainer.style.display = 'none';
        } else if (selectedType === '3') {
            optionsContainer.style.display = 'none';
            checkboxContainer.style.display = 'block';
        }
    }

    // Обработчик смены типа товара
    document.querySelectorAll('input[name="productType"]').forEach(function(elem) {
        elem.addEventListener('change', updateVisibility);
    });

    // Изначально вызываем обновление видимости
    updateVisibility();

    document.getElementById('calculate').addEventListener('click', function() {
        const quantity = quantityInput.value;

        // Проверка корректности ввода
        const quantityRegex = /^[1-9]\d*$/; // Регулярное выражение для положительных целых чисел
        if (!quantityRegex.test(quantity)) {
            errorMessage.innerText = 'Введите корректное количество (целое положительное число).';
            document.getElementById('result').innerText = ''; // Очистить результат
            return;
        } else {
            errorMessage.innerText = ''; // Очистить сообщение об ошибке
        }

        const productPrice = parseFloat(productSelect.value);
        let totalCost = productPrice * parseInt(quantity);

        // Обработка опций и свойств
        const selectedType = document.querySelector('input[name="productType"]:checked').value;

        if (selectedType === '2') {
            const optionPrice = parseFloat(document.getElementById('options').value);
            totalCost += optionPrice; // Добавляем стоимость опции
        } else if (selectedType === '3') {
            const isChecked = document.getElementById('property').checked;
            if (isChecked) {
                totalCost += 300; // Добавляем стоимость свойства
            }
        }

        document.getElementById('result').innerText = `Стоимость заказа: ${totalCost} руб.`;
    });
});
