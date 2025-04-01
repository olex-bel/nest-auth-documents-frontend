import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import MainMenuLink from "./MainMenuLink";
import SubMenu from "./SubMenu";

type MainMenuProps = {
    isAdmin: boolean
}

export default function MainMenu({ isAdmin }: MainMenuProps) {
    const [expanded, setExpanded] = useState(false);
    const handleMenuClick = () => setExpanded(!expanded);

    return (
        <div>
            <button className="md:hidden" aria-label="Menu" onClick={handleMenuClick}><IoMenu /></button>
            <ul role="menubar" className={`${expanded? 'block' : 'hidden'} md:block md:flex md:space-x-4 md:justify-center md:items-center`}>
                <li><MainMenuLink to="/">Home</MainMenuLink></li>
                
                {
                    isAdmin && 
                    <SubMenu label="Admin">
                        <li><MainMenuLink to="admin/users">Users</MainMenuLink></li>
                        <li><MainMenuLink to="admin/folders">Folders</MainMenuLink></li>
                    </SubMenu>
                }

                <SubMenu label="Account">
                    <li><MainMenuLink to="/profile">Profile</MainMenuLink></li>
                    <li><MainMenuLink to="/logout">Logout</MainMenuLink></li>
                </SubMenu>
            </ul>
            
        </div>
    )
}