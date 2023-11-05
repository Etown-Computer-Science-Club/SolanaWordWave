
function startSpeech (sentence){

    let utterance = new SpeechSynthesisUtterance(sentence);
    speechSynthesis.speak(utterance);

}

function stopSpeech(){
    speechSynthesis.cancel();
}

function handleSpeech(sentence, buttonClicked, setButtonClicked, setButtonColor){
    if(buttonClicked == "Start Definition"){

        setButtonClicked("Stop Definition");
        setButtonColor("red")
        //startSpeech(sentence);
        let utterance = new SpeechSynthesisUtterance(sentence);
        speechSynthesis.speak(utterance);

        utterance.onend = function() {
            setButtonClicked("Start Definition");
            setButtonColor("green");
        };
    }
    else if (buttonClicked == "Start Word"){
        
        setButtonClicked("Stop Word");
        setButtonColor("red")
        
        let utterance = new SpeechSynthesisUtterance(sentence);
        speechSynthesis.speak(utterance);

        utterance.onend = function() {
            setButtonClicked("Start Word");
            setButtonColor("green");
        };
    }
    else if(buttonClicked == "Stop Definition"){
        
        setButtonClicked("Start Definition");
        setButtonColor("green")
        speechSynthesis.cancel();
    }
    else{
        setButtonClicked("Start Word");
        setButtonColor("green")
        speechSynthesis.cancel();
    }
}

export default handleSpeech;