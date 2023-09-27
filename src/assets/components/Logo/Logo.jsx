import {Link} from "react-router-dom";
import './Logo.scss'
import useFirebaseData from "../../hooks/useFirebaseData.js";


function Logo({onClick}) {
    const logo = useFirebaseData('logo')
    return (
        <Link to="/" className={"logo"} onClick={onClick} >
            {logo.map(item => (
                <img key={item.id} src={item.img} alt=""/>
            ))}
        </Link>
    );
}

export default Logo;