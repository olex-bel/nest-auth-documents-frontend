import { useState, useEffect, useRef } from "react"
import { useLocation } from "react-router";

type SubMenuProps = {
    label: string;
    children: React.ReactNode;
}

export default function SubMenu({ label, children }: SubMenuProps) {
    const [expanded, setExpanded] = useState(false);
    const menuRef = useRef<HTMLLIElement>(null);
    const location = useLocation();
    const isActive = location.pathname.includes(`/${label.toLowerCase()}/`);

    const toggleMenu = () => setExpanded(!expanded);

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setExpanded(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <li ref={menuRef} className="relative">
            <button 
                aria-haspopup="true"
                className={`focus:outline-none ${isActive ? 'font-bold' : ''}`}
                aria-expanded={expanded} 
                aria-controls={`${label.toLowerCase()}-menu`}
                onClick={toggleMenu}
                onMouseEnter={() => setExpanded(true)}
                onMouseLeave={() => setExpanded(false)}
            >
                {label} +
            </button>
            <ul 
                id={`${label.toLowerCase()}-menu`} 
                role="menu" 
                className={`md:absolute bg-slate-200 p-2 ${expanded ? 'block' : 'hidden'}`}
                onMouseEnter={() => setExpanded(true)}
                onMouseLeave={() => setExpanded(false)}
            >
                {children}
            </ul>
        </li>
    );
}