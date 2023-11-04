
function handleSpeech (sentence){
    
    //alert('Button clicked!!!!');

    let utterance = new SpeechSynthesisUtterance(sentence);
    speechSynthesis.speak(utterance);

}

export default handleSpeech;