import useAppData from "../../data/hook/useAppData";
import ButtonToggleTheme from "./ButtonToggleTheme";
import SideMenu from "./SideMenu";
import Title from "./Title";
import UserAvatar from "./UserAvatar";

interface TopBarProps {
    title: string
    subtitle: string
}

export default function TopBar(props: TopBarProps) {
    const { theme, toggleTheme }= useAppData()

    return (
        <div className={`flex`}>
            <Title title={props.title} subtitle={props.subtitle}/>
            <div className={`flex flex-grow justify-end items-center`}>
                <ButtonToggleTheme theme={theme} toggleTheme={toggleTheme}/>
                <UserAvatar className='ml-3'/>
            </div>
        </div>
    )
}