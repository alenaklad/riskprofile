// Скрипт с диаграммой распределения активов и дополнительными профилями

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
      const conservativeThreshold = 12;
      const moderateConservativeThreshold = 16;
      const moderateThreshold = 20;
      const moderateAggressiveThreshold = 25;

      if (score <= conservativeThreshold) {
        profile = 'Консервативный инвестор';
        allocation = { 'Акции': 15, 'Облигации': 55, 'Золото': 20, 'Денежные фонды': 10 };
      } else if (score <= moderateConservativeThreshold) {
        profile = 'Умеренно-консервативный инвестор';
        allocation = { 'Акции': 30, 'Облигации': 45, 'Золото': 15, 'Денежные фонды': 10 };
      } else if (score <= moderateThreshold) {
        profile = 'Умеренный инвестор';
        allocation = { 'Акции': 45, 'Облигации': 35, 'Золото': 10, 'Денежные фонды': 10 };
      } else if (score <= moderateAggressiveThreshold) {
        profile = 'Умеренно-агрессивный инвестор';
        allocation = { 'Акции': 60, 'Облигации': 25, 'Золото': 10, 'Денежные фонды': 5 };
      } else {
        profile = 'Агрессивный инвестор';
        allocation = { 'Акции': 75, 'Облигации': 15, 'Золото': 5, 'Денежные фонды': 5 };
      }

      document.getElementById('result-text').textContent = profile;
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
