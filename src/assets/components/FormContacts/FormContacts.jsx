import {Link} from "react-router-dom";
import './FormContacts.scss'
import logo from '../../images/Logo.svg'
import useFirebaseData from "../../hooks/useFirebaseData.js";
import searchIcon from "../../images/search.svg";
import {useState} from "react";
import firebase from "firebase/compat/app";


function FormContacts() {
    const [name, setName] = useState('');
    const [send, setSend] = useState(true);
    const [mail, setMail] = useState('');
    const [area, setArea] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        const database = firebase.database();
        const collectionName = 'message';
        database
            .ref(collectionName)
            .once('value')
            .then((snapshot) => {
                const currentCount = snapshot.numChildren();
                const newFolderNumber = currentCount + 1;
                const newData = {
                    name: name,
                    mail: mail,
                    area: area,
                };
                database
                    .ref(`${collectionName}/${newFolderNumber}`)
                    .set(newData)
                    .then(() => {
                        setName('')
                        setMail('')
                        setArea('')
                        setSend(false)
                    })
                    .catch((error) => {
                        console.error(`Ошибка: ${error}`);
                    });
            })
            .catch((error) => {
                console.error(`Ошибка: ${error}`);
            });
    };
    return (
        <div className="contacts__form">
            <form className="contacts__left-block" onSubmit={handleSubmit}>
                <div className="contacts__title">Свяжитесь с нами</div>
                <div className="contacts__input">
                    <label>Ваше имя</label>
                    <input
                        type="text"
                        required
                        placeholder=""
                        value={name}
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="contacts__input">
                    <label>Ваш e-mail</label>
                    <input
                        type="email"
                        required
                        placeholder=""
                        value={mail}
                        name="email"
                        onChange={(e) => setMail(e.target.value)}
                    />
                </div>
                <label>Сообщение</label>
                <textarea
                    required
                    placeholder=""
                    value={area}
                    name="text"
                    onChange={(e) => setArea(e.target.value)}
                />
                <button type="submit" className="contacts__button">{send ? 'Отправить': 'Сообщение отправленно'}</button>
            </form>
            <div className="contacts__right-block">
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
    );
}

export default FormContacts;