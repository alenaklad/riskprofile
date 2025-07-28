// Исправленный script.js

// Ждем загрузки всей страницы
window.addEventListener('DOMContentLoaded', () => {
  // Изменяем футер при загрузке
  const footer = document.querySelector('footer p');
  if (footer) {
    footer.textContent = 'Клад Инвестора 9.0';
  }

  // Вешаем обработчик на кнопку "Пройти тест"
  const startButton = document.getElementById('start-test');
  if (startButton) {
    startButton.addEventListener('click', () => {
      document.getElementById('quiz').classList.remove('hidden');
      document.querySelector('.hero').classList.add('hidden');
    });
  }

  // Обработчик формы теста
  const quizForm = document.getElementById('quiz-form');
  if (quizForm) {
    quizForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      let score = 0;

      for (let [name, value] of formData.entries()) {
        score += parseInt(value);
      }

      let resultText = '';
      const conservativeThreshold = 14;
      const moderateThreshold = 22;

      if (score <= conservativeThreshold) {
        resultText = 'Консервативный инвестор — вы предпочитаете надёжность и стабильность, избегая высоких рисков.';
      } else if (score <= moderateThreshold) {
        resultText = 'Умеренный инвестор — вы готовы к некоторому риску ради умеренной прибыли.';
      } else {
        resultText = 'Агрессивный инвестор — вы стремитесь к максимальной доходности, даже если это связано с высокими рисками.';
      }

      document.getElementById('result-text').textContent = resultText;
      document.getElementById('quiz').classList.add('hidden');
      document.getElementById('result').classList.remove('hidden');
    });
  }
});
