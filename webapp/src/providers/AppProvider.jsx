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
		'Sun_writing': '9 0 AM',
		'Sun_sharing': '6 0 PM',
		'Mon_writing': '9 0 AM',
		'Mon_sharing': '6 0 PM',
		'Tue_writing': '9 0 AM',
		'Tue_sharing': '6 0 PM',
		'Wed_writing': '9 0 AM',
		'Wed_sharing': '6 0 PM',
		'Thu_writing': '9 0 AM',
		'Thu_sharing': '6 0 PM',
		'Fri_writing': '9 0 AM',
		'Fri_sharing': '6 0 PM',
		'Sat_writing': '9 0 AM',
		'Sat_sharing': '6 0 PM',
	});

	const [timers, setTimers] = useState({});

	const [wordings, setWordings] = useState({});

	return (
		<AppContext.Provider value={{ contactInfo, setContactInfo, appointment, setAppointment, timers, setTimers, wordings, setWordings }}>
			{children}
		</AppContext.Provider>
	);
};

export default AppProvider;
