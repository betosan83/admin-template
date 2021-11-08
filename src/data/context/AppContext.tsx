import { createContext, useEffect, useState } from "react";

type Theme = 'dark' | ''

interface AppContextProps {
    theme?: string
    toggleTheme?: () => void
}

const AppContext = createContext<AppContextProps>({
    theme: null,
    toggleTheme: null
})

export function AppProvider(props) {
    const [theme, setTheme] = useState('dark')

    function toggleTheme() {
        const newTheme = theme === '' ? 'dark' : ''
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
    }

    useEffect(() => {
        const themeRegistered = localStorage.getItem('theme')
        setTheme(themeRegistered)
    },[])

    return (
        <AppContext.Provider value={{
            theme,
            toggleTheme
        }}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContext
export const AppConsumer = AppContext.Consumer