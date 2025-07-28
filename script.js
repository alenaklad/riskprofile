// РСЃРїСЂР°РІР»РµРЅРЅС‹Р№ script.js

// Р–РґРµРј Р·Р°РіСЂСѓР·РєРё РІСЃРµР№ СЃС‚СЂР°РЅРёС†С‹
window.addEventListener('DOMContentLoaded', () => {
  // РР·РјРµРЅСЏРµРј С„СѓС‚РµСЂ РїСЂРё Р·Р°РіСЂСѓР·РєРµ
  const footer = document.querySelector('footer p');
  if (footer) {
    footer.textContent = 'Клад Инвестора 9.0';
  }

  // Р’РµС€Р°РµРј РѕР±СЂР°Р±РѕС‚С‡РёРє РЅР° РєРЅРѕРїРєСѓ "РџСЂРѕР№С‚Рё С‚РµСЃС‚"
  const startButton = document.getElementById('start-test');
  if (startButton) {
    startButton.addEventListener('click', () => {
      document.getElementById('quiz').classList.remove('hidden');
      document.querySelector('.hero').classList.add('hidden');
    });
  }

  // РћР±СЂР°Р±РѕС‚С‡РёРє С„РѕСЂРјС‹ С‚РµСЃС‚Р°
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
        resultText = 'РљРѕРЅСЃРµСЂРІР°С‚РёРІРЅС‹Р№ РёРЅРІРµСЃС‚РѕСЂ вЂ” РІС‹ РїСЂРµРґРїРѕС‡РёС‚Р°РµС‚Рµ РЅР°РґС‘Р¶РЅРѕСЃС‚СЊ Рё СЃС‚Р°Р±РёР»СЊРЅРѕСЃС‚СЊ, РёР·Р±РµРіР°СЏ РІС‹СЃРѕРєРёС… СЂРёСЃРєРѕРІ.';
      } else if (score <= moderateThreshold) {
        resultText = 'РЈРјРµСЂРµРЅРЅС‹Р№ РёРЅРІРµСЃС‚РѕСЂ вЂ” РІС‹ РіРѕС‚РѕРІС‹ Рє РЅРµРєРѕС‚РѕСЂРѕРјСѓ СЂРёСЃРєСѓ СЂР°РґРё СѓРјРµСЂРµРЅРЅРѕР№ РїСЂРёР±С‹Р»Рё.';
      } else {
        resultText = 'РђРіСЂРµСЃСЃРёРІРЅС‹Р№ РёРЅРІРµСЃС‚РѕСЂ вЂ” РІС‹ СЃС‚СЂРµРјРёС‚РµСЃСЊ Рє РјР°РєСЃРёРјР°Р»СЊРЅРѕР№ РґРѕС…РѕРґРЅРѕСЃС‚Рё, РґР°Р¶Рµ РµСЃР»Рё СЌС‚Рѕ СЃРІСЏР·Р°РЅРѕ СЃ РІС‹СЃРѕРєРёРјРё СЂРёСЃРєР°РјРё.';
      }

      document.getElementById('result-text').textContent = resultText;
      document.getElementById('quiz').classList.add('hidden');
      document.getElementById('result').classList.remove('hidden');
    });
  }
});
