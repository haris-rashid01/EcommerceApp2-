import { createContext, useState } from "react";


export const ThemeContext = createContext();

const lightTheme = {
  background: "#ffffff",
  text: "#000000",
  card: "#f5f5f5",
  buttonBg: "#000000",
  buttonText: "#ffffff",
  navbarBg: "#678587",  
  footerBg: "#678587",   
};

const darkTheme = {
  background: "#121212",
  text: "#ffffff",
  card: "#1e1e1e",
  buttonBg: "#ffffff",
  buttonText: "#000000",
  navbarBg: "#3b4036ff",   
  footerBg: "#3b4036ff",  
};

export const ThemeProvider = ({children})=>{
const [isDark, setIsDark] = useState(false);

const toggleTheme = () =>{
    setIsDark(prev => !prev);
};

const theme = isDark ? darkTheme : lightTheme;


return (
    <ThemeContext.Provider value={{isDark, toggleTheme, theme}}>
        {children}
    </ThemeContext.Provider>
)


}
