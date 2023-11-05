
function startSpeech (sentence){

    let utterance = new SpeechSynthesisUtterance(sentence);
    speechSynthesis.speak(utterance);

}

function stopSpeech(){
    speechSynthesis.cancel();
}

function handleSpeech(sentence, buttonClicked, setButtonClicked, setButtonColor){
    if(buttonClicked == "Speak Definition"){

        setButtonClicked("Stop Definition");
        setButtonColor("red")
        startSpeech(sentence);
    }
    else if (buttonClicked == "Speak Word"){
        
        setButtonClicked("Stop Word");
        setButtonColor("red")
        startSpeech(sentence);
    }
    else if(buttonClicked == "Stop Definition"){
        
        setButtonClicked("Speak Definition");
        setButtonColor("green")
        speechSynthesis.cancel();
    }
    else{
        setButtonClicked("Speak Word");
        setButtonColor("green")
        speechSynthesis.cancel();
    }
}

export default handleSpeech;