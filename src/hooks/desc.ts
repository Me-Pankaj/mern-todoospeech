import React, { useEffect, useState } from 'react'



let recognition:any = null;
if("webkitSpeechRecognition" in window){
    recognition = new webkitSpeechRecognition();
    recognition.continuous=true;
    recognition.lang="en-US";
}

const useSpeechRecognitiondesc=()=>{
    const [desc,setdesc]=useState("");
    const [isListeningdesc,setIsListeningdesc] = useState(false);

    useEffect(() => {
        if(!recognition) return;

        recognition.onresult=(event: SpeechRecognitionEvent)=>{
            console.log("onresult event: ",event);
            setdesc(event.results[0][0].transcript)
            recognition.stop();
            setIsListeningdesc(false);
        };
    }, []);

    const startListeningdesc=()=>{
        setdesc('')
        setIsListeningdesc(true);
        recognition.start();
    }
    
    const stopListeningdesc=()=>{
        setIsListeningdesc(false);
        recognition.stop()
    }

    return{
        desc,
        isListeningdesc,
        startListeningdesc,
        stopListeningdesc,
        hasRecognitionSupportdesc: !! recognition,
    }
}

export default useSpeechRecognitiondesc;