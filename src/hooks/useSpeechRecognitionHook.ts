import React, { useEffect, useState } from 'react'

let recognition:any = null;
if ("webkitSpeechRecognition" in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";
    // recognition.interimResults = true;
    // recognition.maxSpeechTime = 20;
  }
  

const useSpeechRecognition=()=>{
    const [text,setText]=useState("");
    const [prevText, setPrevText] = useState("");
    const [isListening,setIsListening] = useState(false);

    useEffect(() => {
        if(!recognition) return;

        recognition.onresult= async (event: SpeechRecognitionEvent)=>{
            console.log("onresult event: ",event);
             const newText = event.results[0][0].transcript;
             await setText(prevText + ' ' + newText);
             await setPrevText(text);
        };
    }, [text,prevText]);

    const startListening =  () => {
        setIsListening(true);
        console.log("lis is working")
        recognition.start();
};

    
    const stopListening=  ()=>{
        recognition.stop();
         setPrevText(text);
        setIsListening(false);
    };

    return{
        text,
        prevText,
        isListening,
        startListening,
        stopListening,
        hasRecognitionSupport: !! recognition,
    }
}

export default useSpeechRecognition;
