document.addEventListener('DOMContentLoaded', function() {
    const quantityInput = document.getElementById('quantity');
    const productSelect = document.getElementById('product');
    const optionsContainer = document.getElementById('options-container');
    const optionsSelect = document.getElementById('options');
    const checkboxContainer = document.getElementById('checkbox-container');
    const errorMessage = document.getElementById('error-message');
    const resultDisplay = document.getElementById('result');

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
        calculateTotal(); // Пересчитываем стоимость при изменении видимости
    }

    // Функция для расчета стоимости
    function calculateTotal() {
        const quantity = parseInt(quantityInput.value);

        // Проверка корректности ввода
        if (isNaN(quantity) || quantity < 0) {
            errorMessage.innerText = 'Введите корректное количество (целое неотрицательное число).';
            resultDisplay.innerText = 'Стоимость заказа: 0 руб.';
            return;
        } else {
            errorMessage.innerText = ''; // Очистить сообщение об ошибке
        }

        // Если количество 0, то итоговая стоимость равна 0
        if (quantity === 0) {
            resultDisplay.innerText = 'Стоимость заказа: 0 руб.';
            return;
        }

        const productPrice = parseFloat(productSelect.value);
        let totalCost = productPrice * quantity;

        // Обработка опций
        const selectedType = document.querySelector('input[name="productType"]:checked').value;
        if (selectedType === '2') {
            const optionPrice = parseFloat(optionsSelect.value);
            totalCost += optionPrice * quantity; // Добавляем стоимость опции
        }

        // Обработка свойств (чекбоксов) для типа товара 3
        if (selectedType === '3') {
            const checkboxes = document.querySelectorAll('.property-checkbox');
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    const propertyPrice = parseFloat(checkbox.getAttribute('data-price'));
                    totalCost += propertyPrice * quantity;
                }
            });
        }

        resultDisplay.innerText = `Стоимость заказа: ${totalCost} руб.`;
    }

    // Добавляем обработчики событий для всех элементов, влияющих на расчет
    quantityInput.addEventListener('input', calculateTotal);
    productSelect.addEventListener('change', calculateTotal);
    optionsSelect.addEventListener('change', calculateTotal);
    document.querySelectorAll('.property-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', calculateTotal);
    });
    document.querySelectorAll('input[name="productType"]').forEach(function(elem) {
        elem.addEventListener('change', updateVisibility);
    });

    // Изначально вызываем обновление видимости и расчета стоимости
    updateVisibility();
    calculateTotal();
});
