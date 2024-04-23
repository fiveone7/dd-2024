import { createContext, useState } from "react";

export const AppContext  = createContext();

const AppProvider = ({children}) => {

    const [contactInfo, setContactInfo] = useState({});

    return (
        <AppContext.Provider value={{contactInfo, setContactInfo}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;