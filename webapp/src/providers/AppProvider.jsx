import { createContext, useState } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [contactInfo, setContactInfo] = useState({
        myName: "",
        myEmail: "",
        myNumber: "",
        spouseName: "",
        spouseEmail: "",
        spouseNumber: "",
    });

    const [appointment, setAppointment] = useState({
        Sun_writing: [9, 0, 0],
        Sun_sharing: [6, 0, 1],
        Mon_writing: [9, 0, 0],
        Mon_sharing: [6, 0, 1],
        Tue_writing: [9, 0, 0],
        Tue_sharing: [6, 0, 1],
        Wed_writing: [9, 0, 0],
        Wed_sharing: [6, 0, 1],
        Thu_writing: [9, 0, 0],
        Thu_sharing: [6, 0, 1],
        Fri_writing: [9, 0, 0],
        Fri_sharing: [6, 0, 1],
        Sat_writing: [9, 0, 0],
        Sat_sharing: [6, 0, 1],
    });

    const [timers, setTimers] = useState({
        write_time: 5, // 5 mins
        write_alarm: [
            {
                time: 2, // 2 mins
                enabled: true,
                unit: "m",
            },
            {
                time: 40, // 1 mins
                enabled: true,
                unit: "s",
            },
        ],
        audio_time: 5, // 5 mins
        audio_alarm: [
            {
                time: 1, // 1 min
                enabled: true,
                unit: "m",
            },
        ],
        video_time: 3, // 3 mins
        video_alarm: [
            {
                time: 1, // 1 min
                enabled: true,
                unit: "m",
            },
        ],
    });

    const [words, setWords] = useState({
        appointment: "",
        done: "",
        share: ""
    });

    return (
        <AppContext.Provider
            value={{
                contactInfo,
                setContactInfo,
                appointment,
                setAppointment,
                timers,
                setTimers,
                words,
                setWords,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
