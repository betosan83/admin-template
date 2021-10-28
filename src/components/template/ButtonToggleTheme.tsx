import { SunIcon } from "../icons";

interface ButtonToggleThemeProps {
    theme: string
    toggleTheme: () => void
} 

export default function ButtonToggleTheme(props: ButtonToggleThemeProps) {

    return props.theme === 'dark' ? (
        <div onClick={props.toggleTheme} className={`
        
        `}>
            <div className={`
            
            `}>
                {SunIcon}
            </div>
            <div className={`
            
            `}>
                <span>Light</span>
            </div>
        </div>
    ) : (
        <div></div>
    )
}