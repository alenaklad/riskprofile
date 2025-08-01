// Скрипт с диаграммой распределения активов, дополнительными профилями, описаниями и рекомендациями

window.addEventListener('DOMContentLoaded', () => {
  const footer = document.querySelector('footer p');
  if (footer) {
    footer.textContent = 'Клад Инвестора 9.0';
  }

  const startButton = document.getElementById('start-test');
  if (startButton) {
    startButton.addEventListener('click', () => {
      document.getElementById('quiz').classList.remove('hidden');
      document.querySelector('.hero').classList.add('hidden');
    });
  }

  const quizForm = document.getElementById('quiz-form');
  if (quizForm) {
    quizForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      let score = 0;
      for (let [name, value] of formData.entries()) {
        score += parseInt(value);
      }

      let profile = '';
      let allocation = {};
      let description = '';
      let allocationExplanation = '';
      let recommendations = '';

      const conservativeThreshold = 12;
      const moderateConservativeThreshold = 16;
      const moderateThreshold = 20;
      const moderateAggressiveThreshold = 25;

      if (score <= conservativeThreshold) {
        profile = 'Консервативный инвестор';
        allocation = { 'Акции': 15, 'Облигации': 60, 'Золото': 15, 'Денежные фонды': 10 };
        description = 'Вы предпочитаете низкий риск и стабильность. Ваша цель — сохранение капитала с минимальными колебаниями.';
        allocationExplanation = 'Основной упор сделан на облигации и защитные активы (золото и денежные фонды), чтобы снизить волатильность портфеля.';
        recommendations = 'Избегайте высокорискованных инструментов, выбирайте надёжные облигации и доходные депозиты. Рассмотрите диверсификацию через фонды облигаций, облигаций разных видов (например, государственные и корпоративные) и золото.';
      } else if (score <= moderateConservativeThreshold) {
        profile = 'Умеренно-консервативный инвестор';
        allocation = { 'Акции': 30, 'Облигации': 50, 'Золото': 10, 'Денежные фонды': 10 };
        description = 'Вы готовы к небольшим рискам ради умеренной доходности, но сохранность средств всё еще важна.';
        allocationExplanation = 'Добавлены акции для роста капитала, но основная доля остаётся в облигациях и защитных активах.';
        recommendations = 'Инвестируйте в диверсифицированные фонды акций и облигаций. Если ивестируете в отдельные акции - обаращйте внимание на стабильность денежных потков и дивидендов компании. В случае отдельных облигаций - контролируйте долговую нагрузку компании. Избегайте концентрации в одной компании или отрасли.';
      } else if (score <= moderateThreshold) {
        profile = 'Умеренный инвестор';
        allocation = { 'Акции': 50, 'Облигации': 35, 'Золото': 10, 'Денежные фонды': 5 };
        description = 'Вы ищете баланс между риском и доходностью. Для вас комфортны временные колебания ради долгосрочного роста.';
        allocationExplanation = 'Портфель сбалансирован: акции дают рост, облигации снижают риск, золото защищает от инфляции.';
        recommendations = 'Регулярно пересматривайте портфель, используйте надежные облигации и акции стабильных компаний, учитывайте долгосрочные цели.';
      } else if (score <= moderateAggressiveThreshold) {
        profile = 'Умеренно-агрессивный инвестор';
        allocation = { 'Акции': 65, 'Облигации': 30, 'Золото': 5, 'Денежные фонды': 0 };
        description = 'Вы готовы к риску ради повышенной доходности, но всё же оставляете часть средств в защитных активах.';
        allocationExplanation = 'Основной упор на акции для роста капитала, при этом облигации и золото снижают общий риск портфеля.';
        recommendations = 'Инвестируйте в акции крупных и средних компаний, добавляйте облигации для снижения риска. Рассмотрите фонды акций роста.';
      } else {
        profile = 'Агрессивный инвестор';
        allocation = { 'Акции': 75, 'Облигации': 20, 'Золото': 5, 'Денежные фонды': 0 };
        description = 'Вы стремитесь к максимальной доходности и готовы переносить высокую волатильность и риск.';
        allocationExplanation = 'Высокая доля акций обеспечивает рост, минимальная доля защитных активов оставлена для базовой диверсификации.';
        recommendations = 'Фокусируйтесь активах, которые позволят капиталу расти быстрее. Но не забывайте о минимальной доле защитных активов для диверсификации.';
      }

      const resultText = document.getElementById('result-text');
      resultText.innerHTML = `<strong>${profile}</strong><br><p>${description}</p><p><em>Почему такое распределение активов?</em> ${allocationExplanation}</p><p><strong>Рекомендации:</strong> ${recommendations}</p>`;

      document.getElementById('quiz').classList.add('hidden');
      document.getElementById('result').classList.remove('hidden');

      drawChart(allocation);
    });
  }
});

function drawChart(allocation) {
  const ctxId = 'allocationChart';
  let canvas = document.getElementById(ctxId);
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = ctxId;
    document.getElementById('result').appendChild(canvas);
  }

  if (typeof Chart === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.onload = () => buildChart(canvas, allocation);
    document.body.appendChild(script);
  } else {
    buildChart(canvas, allocation);
  }
}

function buildChart(canvas, allocation) {
  const labels = Object.keys(allocation);
  const data = Object.values(allocation);

  new Chart(canvas, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: ['#4caf50', '#2196f3', '#ff9800', '#9e9e9e'],
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
        title: {
          display: true,
          text: 'Распределение активов (%)'
        }
      }
    }
  });
}
