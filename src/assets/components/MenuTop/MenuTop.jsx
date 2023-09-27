import {Link} from "react-router-dom";
import './MenuTop.scss'
import useFirebaseData from "../../hooks/useFirebaseData.js";
import {useEffect, useState} from "react";
import ModalAdmin from "../ModalAdmin/index.jsx";
import firebase from "firebase/compat/app";
const menu = [
    {
        "id": "1",
        "item": "Главная",
        "link": "/"
    },
    {
        "id": "2",
        "item": "О нас",
        "link": "/About"
    },
    {
        "id": "3",
        "item": "Контакты",
        "link": "/Contacts"
    },
];
const menuInfo = [
    {
        "id": "1",
        "item": "Оплата",
        "link": "/Payment"
    },
    {
        "id": "2",
        "item": "Доставка",
        "link": "/Delivery"
    },
    // {
    //     "id": "3",
    //     "item": "Админ",
    //     "link": "/AdminPanel"
    // },
];

function MenuTop({click}) {
    const usersIdAdmin = useFirebaseData('usersIdAdmin');
    const usersId = useFirebaseData('usersIdAdmin');
    const [lasId, setLasId] = useState('');
    useEffect(() => {
        const mappedArray = usersId.map((item) => {
            return item.id;
        });
        const resultString = mappedArray.join(', ')
        setLasId(resultString);
    }, [usersId]);
    const [isClick, setIsClick] = useState(false);
    const handleClose = () => {
        setIsClick(false);
    };
    const handleClick = (e) => {
        e.preventDefault()
        setIsClick(true);
    };
    const handleGoOut = () => {
        const database = firebase.database();
        const itemRefToRemove = database.ref(`${'usersIdAdmin'}/userId${lasId}`);
        itemRefToRemove.remove()
            .then(() => {
                console.log('Объект успешно удален из базы данных.');
            })
            .catch((error) => {
                console.error('Ошибка при удалении объекта из базы данных: ', error);
            });
    }

    useEffect(() => {
        console.log("hello")
    }, [])
    return (
        <nav className={"menu__top-main"}>
            <ul>
                {
                    menu.map((item, id) => {
                        return (
                            <li key={id}>
                                <Link
                                    id={id}
                                    className={click === id || (click === null && item.link === "/") ? 'active' : ''}

                                    to={item.link}
                                >
                                    {item.item}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
            <ul>
                {
                    menuInfo.map((item, id) => {
                        return (
                            <li key={id}>
                                <Link
                                    id={id}
                                    className={click === id || (click === null && item.link === "/") ? 'active' : ''}
                                    to={item.link}
                                >
                                    {item.item}
                                </Link>
                            </li>
                        )
                    })
                }
                <Link
                    className="rt"
                    // to={"/AdminPanel"}
                    onClick={usersIdAdmin.length === 0  ? handleClick : null}
                >
                    {usersIdAdmin.length === 0 ? <span>Админ</span> : <span className="admin-auto">Админ</span>}
                    {usersIdAdmin.length === 0 ? null : <div className='user__menu'>
                        <Link to="/AdminPanel">Личный кабинет</Link>
                        <Link onClick={handleGoOut} to="">Выйти из кабинета</Link>
                    </div>
                    }
                </Link>
            </ul>
            {isClick ? <ModalAdmin handleClose={handleClose}/> : null}
        </nav>
    );
}

export default MenuTop;