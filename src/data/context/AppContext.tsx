import { createContext, useState } from "react";

type Theme = 'dark' | ''

interface AppContextProps {
    theme?: Theme
    toggleTheme?: () => void
}

const AppContext = createContext<AppContextProps>({
    theme: null,
    toggleTheme: null
})

export function AppProvider(props) {
    const [theme, setTheme] = useState<Theme>('dark')

    function toggleTheme() {
        setTheme(theme === '' ? 'dark' : '')
    }

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