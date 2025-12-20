import { createContext, useContext } from "react";
import { ThemeProvider } from "./themecontext";

const languageContext = createContext({
    language : "ENG" | "MR",
    toggleLanguage : "ENG" ? "MAR" : "ENG"
});


export const languageProvider = ({children})=>{
    const [language,setLanguage] = usestate("ENG");

    const changeLanguage = ()=>{
        const newLanguage = language === "ENG" ? "MAR" : "ENG";
        setLanguage(newLanguage);
    }
    return <languageProvider value={{language,toggleLanguage}}>
        {children}
    </languageProvider>
}

export const useLanguage = useContext(languageContext);