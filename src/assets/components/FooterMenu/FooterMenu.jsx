import {Link} from "react-router-dom";
import './FooterMenu.scss'
import useFirebaseData from "../../hooks/useFirebaseData.js";

function FooterMenu({click, handleActive}) {
    const menu = useFirebaseData('menu-footer')
    return (
        <div className="menu-footer">
            <nav className={"menu__footer"}>
                <ul>
                    {
                        menu.map((item, id) => {
                            return (
                                <li key={id}>
                                    <Link
                                        id={id}
                                        className={click === id || (click === null && item.link === "/") ? 'active' : ''}
                                        onClick={() => handleActive(id)}
                                        to={item.link}
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

export default FooterMenu;