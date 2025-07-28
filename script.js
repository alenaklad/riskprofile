document.getElementById('start-test').addEventListener('click', () => {
  document.getElementById('quiz').classList.remove('hidden');
  document.querySelector('.hero').classList.add('hidden');
});

document.getElementById('quiz-form').addEventListener('submit', function (e) {
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
