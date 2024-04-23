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

	const [appointment, setAppointment] = useState({});

	const [timers, setTimers] = useState({});

	const [wordings, setWordings] = useState({});

	return (
		<AppContext.Provider value={{ contactInfo, setContactInfo, appointment, setAppointment, timers, setTimers, wordings, setWordings }}>
			{children}
		</AppContext.Provider>
	);
};

export default AppProvider;
