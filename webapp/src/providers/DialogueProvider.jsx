import { createContext } from "react";
import { useState } from "react";

export const DialogueContext = createContext();

const DialogueProvider = ({ children }) => {
    const [date, setDate] = useState("");
    const [writingTime, setWritingTime] = useState("");
    const [sharingTime, setSharingTime] = useState("");
    const [question, setQuestion] = useState("");
    const [emotion, setEmotion] = useState("");
    const [feelingCategory, setFeelingCategory] = useState([]);
    const [selectedFeelings, setSelectedFeelings] = useState([]);

    const onNext = (step) => {
        if (step === 1) {
            if (date === "" || writingTime === "" || sharingTime === "") {
                return {
                    result: false,
                    msg: "You have to select date and time for appointment.",
                };
            }
        } else if (step === 2) {
            
        } else if (step === 3) {

        }

        return {
            result: true,
            msg: "Success",
        };
    };

    const onPrev = (step) => {

        if ( step === 1 ) {

        } else if (step === 2) {

        } else if (step === 3) {
            
        }

        return {
            result: true,
            msg: "Success",
        };
    };

    return (
        <DialogueContext.Provider
            value={{
                date,
                setDate,
                writingTime,
                setWritingTime,
                sharingTime,
                setSharingTime,
                onNext,
                onPrev,
                question,
                setQuestion,
                emotion,
                setEmotion,
                feelingCategory,
                setFeelingCategory
            }}
        >
            {children}
        </DialogueContext.Provider>
    );
};

export default DialogueProvider;
