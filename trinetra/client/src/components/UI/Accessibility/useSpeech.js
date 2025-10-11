// src/Accessibility/useSpeech.js
export default function useSpeech() {
  const synth = window.speechSynthesis;

  return (text) => {
    if (!synth) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1;
    utter.pitch = 1;
    synth.speak(utter);
  };
}
