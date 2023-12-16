if ("webkitSpeechRecognition" in window) {
    let speechRecognition = new webkitSpeechRecognition();
    let final_transcript = "";

    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;
    speechRecognition.lang = document.querySelector("#select_dialect").value;

    speechRecognition.onstart = () => {
      document.querySelector("#status").style.display = "block";
      document.querySelector("#interim").innerHTML = "";
      document.querySelector("#final").innerHTML = "";
      final_transcript = "";
    };
    speechRecognition.onerror = () => {
      document.querySelector("#status").style.display = "none";
      console.log("Speech Recognition Error");
    };
    speechRecognition.onend = () => {
      document.querySelector("#status").style.display = "none";
      console.log("Speech Recognition Ended");
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
      document.querySelector("#interim").innerHTML = interim_transcript;

      if (final_transcript.toLowerCase().includes("привет")) {
        speak("Привет! Как я могу вам помочь?");
      } else if (final_transcript.toLowerCase().includes("пока")) {
        speak("До свидания! Возвращайтесь, если будет нужна помощь.");
      } else if (final_transcript.toLowerCase().includes("открой youtube")) {
        window.open("https://www.youtube.com/", "_blank");
      } else if (final_transcript.toLowerCase().includes("открой, проводник.")) {
        fetch('/open_explorer')
          .then(response => response.text())
          .then(result => {
            console.log(result);
            speak(result);
          })
          .catch(error => {
            console.error('Error:', error);
            speak('Произошла ошибка при выполнении команды.');
          });
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
      speechSynthesis.speak(utterance);
    }
  } else {
    console.log("Speech Recognition Not Available");
  }