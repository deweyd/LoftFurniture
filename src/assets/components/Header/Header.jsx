import './Header.scss'
import Menu from "../Menu/index.jsx";
import {useState} from "react";
import Search from "../Search/index.jsx";
import MenuTop from "../MenuTop/index.jsx";
import Users from "../Users/index.jsx";
import Logo from "../Logo/Logo.jsx";



function Header() {
    const [click, setClick] = useState(null)
    return (
        <div className={"header"}>
            <div className={"header__top"}>
                <div className="container-wrap">
                    <MenuTop/>
                </div>
            </div>
            <div className="container-wrap">
                <div className={"header__main"}>
                    <Logo onClick={() => setClick(null)}/>
                    <Search/>
                    <Users/>
                </div>
                <div className={"header__menu"}>
                    <Menu click={click} handleActive={setClick}/>
                </div>

            </div>
        </div>
    );
}

export default Header;