import { BellIcon, HomeIcon, SettingsIcon } from "../icons";
import Logo from "./Logo";
import MenuItem from "./MenuItem";


export default function SideMenu() {

    return (
        <aside>
            <div className={`
                flex flex-col items-center justify-center
                bg-gradient-to-r from-indigo-500 to-purple-800
                h-20 w-20 
            `}>
                <Logo/>
            </div>
            <ul>
                <MenuItem url="/" text="Home" icon={HomeIcon}/>
                <MenuItem url="/settings" text="Settings" icon={SettingsIcon}/>
                <MenuItem url="/notifications" text="Notifications" icon={BellIcon}/>
            </ul>
        </aside>
    )
}