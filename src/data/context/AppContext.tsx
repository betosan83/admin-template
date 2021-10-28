import { createContext } from "react";

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

    function toggleTheme() {
        console.log('toggleTheme')
    }

    return (
        <AppContext.Provider value={{
            theme: 'dark',
            toggleTheme
        }}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContext
export const AppConsumer = AppContext.Consumer