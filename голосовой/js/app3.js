var langs = [
  ['English', ['en-AU', 'en-GB']],
  ['Pусский', ['ru-RU']],
];

let select_language = document.querySelector('#select_language');
let select_dialect = document.querySelector('#select_dialect');

for (var i = 0; i < langs.length; i++) {
  select_language.options[i] = new Option(langs[i][0], i);
}

select_language.selectedIndex = 1; // Choose Russian by default
updateCountry();
select_dialect.selectedIndex = 0;

function updateCountry() {
  for (var i = select_dialect.options.length - 1; i >= 0; i--) {
      select_dialect.remove(i);
  }
  var list = langs[select_language.selectedIndex];
  for (var i = 1; i < list.length; i++) {
      select_dialect.options.add(new Option(list[i][1], list[i][0]));
  }
  select_dialect.style.visibility = list[1].length == 1 ? 'hidden' : 'visible';
}

// Function to set the voice to a pleasant female voice
function setFemaleVoice() {
  const selectedLanguage = langs[select_language.selectedIndex][0];
  const selectedDialect = select_dialect.value;

  // Check if the selected language is Russian and set a female voice
  if (selectedLanguage === 'Pусский') {
      const voices = speechSynthesis.getVoices();
      const femaleVoice = voices.find(voice => voice.lang === 'ru-RU' && voice.name.includes('female'));

      if (femaleVoice) {
          speechSynthesis.cancel(); // Cancel any ongoing speech
          speechSynthesis.onvoiceschanged = null; // Remove the event listener
          let utterance = new SpeechSynthesisUtterance("Привет! Это пример приятного женского голоса.");
          utterance.voice = femaleVoice;
          speechSynthesis.speak(utterance);
      }
  }
}

// Ensure that the voices are loaded before trying to set the female voice
speechSynthesis.onvoiceschanged = setFemaleVoice;