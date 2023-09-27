import {Link} from "react-router-dom";
import './Menu.scss'
import useFirebaseData from "../../hooks/useFirebaseData.js";
import {useState} from "react";

function Menu({click, handleActive}) {
    const menu = useFirebaseData('menu');
    const [patch, setPatch] = useState("/Cards");
    return (
        <div className={"menu menu-mobil"}>
            <nav className={"menu__main"}>
                <ul>
                    {
                        menu.map((item, id) => {
                            return (
                                <li key={id}>
                                    <span><img src={item.img} alt=""/></span>
                                    <Link
                                        id={id}
                                        className={click === id || (click === null && item.link === "/") ? 'active' : ''}
                                        onClick={() => handleActive(id)}
                                        to={`/Cards/${item.item}`}
                                    >
                                        {item.item}
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
        </div>
    );
}

export default Menu;