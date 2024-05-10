import { createContext } from "react";
import { useState } from "react";

export const QuestionContext = createContext();

const QuestionProvider = ({ children }) => {
    const [date, setDate] = useState("");
    const [writingTime, setWritingTime] = useState("");
    const [sharingTime, setSharingTime] = useState("");
    const [category, setCategory] = useState([]);
    const [currentCategory, setCurrentCategory] = useState("1");
    const [currentQuestion, setCurrentQuestion] = useState("1");

    const onNext = (step) => {
        if (step === 1) {
            if (date === "" || writingTime === "" || sharingTime === "") {
                return {
                    result: false,
                    msg: "You have to select date and time for appointment.",
                };
            }
        } else if (step === 2) {
            if (category && category[currentCategory] && category[currentCategory]['questions'] && category[currentCategory]['questions'].length > 0)
                setCurrentQuestion(category[currentCategory]['questions'][0].id);
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
        <QuestionContext.Provider
            value={{
                date,
                setDate,
                writingTime,
                setWritingTime,
                sharingTime,
                setSharingTime,
                onNext,
                onPrev,
                category,
                setCategory,
                currentQuestion,
                setCurrentQuestion,
                currentCategory,
                setCurrentCategory,
            }}
        >
            {children}
        </QuestionContext.Provider>
    );
};

export default QuestionProvider;
