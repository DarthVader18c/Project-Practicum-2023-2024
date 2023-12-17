if ("webkitSpeechRecognition" in window) {
  let speechRecognition = new webkitSpeechRecognition();
  let final_transcript = "";

  speechRecognition.continuous = true;
  speechRecognition.interimResults = true;

  speechRecognition.onstart = () => {
      document.querySelector("#status").style.display = "block";
      document.querySelector("#interim").innerHTML = "";
      document.querySelector("#final").innerHTML = "";
      final_transcript = "";
  };

  speechRecognition.onerror = () => {
      document.querySelector("#status").style.display = "none";
      console.log("Ошибка распознавания речи");
  };

  speechRecognition.onend = () => {
      document.querySelector("#status").style.display = "none";
      console.log("Распознавание речи завершено");
  };

  speechRecognition.onresult = (event) => {
      let interim_transcript = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
              final_transcript += event.results[i][0].transcript;
          } else {
              interim_transcript += event.results[i][0].transcript;
          }
      }

      document.querySelector("#final").innerHTML = final_transcript;

      if (final_transcript.toLowerCase().includes("привет")) {
          speak("Привет мой хороший");
      } else if (final_transcript.toLowerCase().includes("пока")) {
          speak("До свидания! Возвращайтесь, если будет нужна помощь.");
      } else if (final_transcript.toLowerCase().includes("как дела?")) {
          speak("Отлично, у вас как?");
      } else if (final_transcript.toLowerCase().includes("какая у нас будет оценка по проекту?")) {
          speak("У вас будет пятёрка");
      } else if (final_transcript.toLowerCase().includes("как у тебя прошел день?")) {
          speak("Ничего интересного, лучше расскажите мне как у вас прошел?");
      } else if (final_transcript.toLowerCase().includes("давай пообщаемся")) {
          speak("ты точно хочешь этого?");
      } else if (final_transcript.toLowerCase().includes("да")) {
          speak("уф уф уф");
      } else if (final_transcript.toLowerCase().includes("посоветуй, аниме.")) {
          speak("На первое место я поставлю Хеллсинг, на второе место Берсерка, на третье Крутого учителя Онидзуку, на четвертое Наруто, на пятое Тотальный гарем");
      } else if (final_transcript.toLowerCase().includes("у меня плохое настроение")) {
          speak("Для такого случая у меня есть шуточка. Целоваться с некурящей девушкой - то же самое, что облизывать мытую пепельницу.");
      } else if (final_transcript.toLowerCase().includes("открой")) {
          if (final_transcript.toLowerCase().includes("youtube")) {
              window.location.href = "https://www.youtube.com/";
          } else {
              const searchQuery = final_transcript
                .toLowerCase()
                .replace("открой", "")
                .replace("найди", "")
                .replace("что такое", "")
                .trim();
              const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
              window.location.href = searchUrl;
          }
      
      } else if (final_transcript.toLowerCase().includes("твоя мама похожа на одного персонажа")) {
          speak("На тэчиса из доты потому она террористка смертница?");
      } else if (final_transcript.toLowerCase().includes("что я сегодня буду делать?")) {
          speak("Как обычно ничего, лоботряс");
      } else if (final_transcript.toLowerCase().includes("скажи цитату")) {
          speak("Что же вершит судьбу человечества в этом мире? Некое незримое существо? Или закон, нечто подобное длани Господней? По крайне мере истинно то что человек не властен даже над своей волей!");
      } else if (final_transcript.toLowerCase().includes("проводник.")) {
          // Открываем файловый проводник (input type=file)
          document.querySelector("#fileInput").click();
      } else if (final_transcript.toLowerCase().includes("калькулятор")) {
          calculate(final_transcript);
      }
  };

  document.querySelector("#start").onclick = () => {
      speechRecognition.start();
  };

  document.querySelector("#stop").onclick = () => {
      speechRecognition.stop();
  };

  function speak(text) {
      let utterance = new SpeechSynthesisUtterance(text);

      // Используем женский голос для русского языка
      const selectedLanguage = 'ru-RU';
      const voices = speechSynthesis.getVoices();
      const femaleVoice = voices.find(voice => voice.lang === selectedLanguage && voice.name.includes('female'));

      if (femaleVoice) {
          utterance.voice = femaleVoice;
      }

      speechSynthesis.speak(utterance);
  }

  function calculate(expression) {
    try {
        // Убираем слово "калькулятор" из выражения
        expression = expression.replace("калькулятор", "").trim();

        // Заменяем слова на математические операторы
        expression = expression.replace(/умножить на/g, '*');
        expression = expression.replace(/подели на/g, '/');
        expression = expression.replace(/вычти/g, '-');
        expression = expression.replace(/сложи с/g, '+');

        const result = eval(expression);
        speak(`Результат: ${result}`);
    } catch (error) {
        speak("Произошла ошибка при вычислении. Пожалуйста, уточните команду.");
    }
}
} else {
  console.log("Распознавание речи недоступно");
}