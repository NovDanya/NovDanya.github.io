document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('calculate').addEventListener('click', function() {
      const quantityInput = document.getElementById('quantity');
      const quantity = quantityInput.value;
      const errorMessage = document.getElementById('error-message');

      // Проверка корректности ввода
      const quantityRegex = /^[1-9]\d*$/; // Регулярное выражение для положительных целых чисел
      if (!quantityRegex.test(quantity)) {
          errorMessage.innerText = 'Введите корректное количество (целое положительное число).';
          document.getElementById('result').innerText = ''; // Очистить результат
          return;
      } else {
          errorMessage.innerText = ''; // Очистить сообщение об ошибке
      }

      const productPrice = parseFloat(document.getElementById('product').value);
      const totalCost = productPrice * parseInt(quantity);
      document.getElementById('result').innerText = `Стоимость заказа: ${totalCost} руб.`;
  });
});
