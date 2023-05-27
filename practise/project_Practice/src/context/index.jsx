import { useContext, createContext } from "react";
const GlobalContext = createContext()
export const GlobalContextProvider = (props) => {
    const state = {
        name: "khan"
    }
    return (
        <GlobalContext.Provider value={state}>
            {props.childern}
        </GlobalContext.Provider>
    )
}
export const useGlobalContext = () => useContext(GlobalContext);
