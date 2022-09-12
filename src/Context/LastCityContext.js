import React,{createContext, useState} from "react";

export const LastCityContext=createContext();

export const LastCityProvider = ({children}) => {
    const [lastLocation,setLastLocation] = useState('istanbul');
    // setLastLocation(children);


    const value = {
        lastLocation,
        setLastLocation,
    }

    return(
        <LastCityContext.Provider value={value}>
             {children}
        </LastCityContext.Provider>
    );
};

export default LastCityContext;