import './Footer.scss'
import Menu from "../Menu/Menu.jsx";
import FooterMenu from "../FooterMenu/index.jsx";
import {Link} from "react-router-dom";




function Footer() {
    return (
        <div className="footer">
            <div className="container-wrap">
                <div className="footer__box">
                    <div className="footer__left">
                        <div className="footer__title">НАВИГАЦИЯ</div>
                        <FooterMenu/>
                    </div>
                    <div className="footer__right">
                        <div className="footer__logo">LM</div>
                        <div className="footer__address">
                            <span>г. Киев</span>
                        </div>
                    </div>
                </div>
                <div className="footer__bottom">
                    <div className="footer__bottom-right">
                        <nav>
                            <ul>
                                <li><Link to="">8 (964) 89 99 119</Link></li>
                                <li><Link to="">INSTAGRAM</Link></li>
                                <li><Link to="">mebel_loft@gmail.com</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;